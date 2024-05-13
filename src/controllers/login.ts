import { Request, Response, NextFunction } from 'express';
import { IRequest } from '../constants/types';
import {User} from "../models/user";
import { HTTP_STATUS_CODES } from '../constants/constants';
import jwt from 'jsonwebtoken';

export const login = async (req: IRequest, res: Response, next: NextFunction) => {


  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password,next);
    if (user) {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', {
        expiresIn: '7d',
      });
      res.send({ token });
    }
  } catch(err: any) {
      res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({ message: err.message, requestBody: req.body });
    };
}
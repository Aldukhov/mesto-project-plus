import { Request, Response, NextFunction } from 'express';
import User from "../models/user";
import { HTTP_STATUS_CODES } from '../constants/constants';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { password, email } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({ message: err.message });
    });
}
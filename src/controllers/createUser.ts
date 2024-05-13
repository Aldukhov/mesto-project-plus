import { Request, Response, NextFunction } from 'express';
import {User} from "../models/user";
import { handleErrors } from '../errors/handleErrors';
import bcrypt from 'bcrypt'
import { HTTP_STATUS_CODES } from '../constants/constants';

export const createUser = (req: Request, res: Response, next: NextFunction) => {

  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(req.body.password, salt))
    .then((hashed) => User.create({ ...req.body, password: hashed }))
    .then((user) => {
      const {
        email, name, about, avatar,
      } = user;
      res.send({
        email, name, about, avatar,
      });
    })
    .catch((error) => {
      handleErrors(error, req, res, next);
    });
}

import { Request, Response, NextFunction } from 'express';
import User from "../models/user";
import { handleErrors } from '../errors/handleErrors';
import bcrypt from 'bcryptjs'
import { HTTP_STATUS_CODES } from '../constants/constants';

export const createUser = (req: Request, res: Response, next: NextFunction) => {


  const { password, email, name, about, avatar } = req.body;

  const userName = name || "Жак-Ив Кусто";
  const userAbout = about || "Исследователь";
  const userAvatar = avatar || "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png";

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      name: userName,
      about: userAbout,
      avatar: userAvatar,
      password: hash,
    }))
    .then((user) => {
      const { _id, email } = user;
      res.status(HTTP_STATUS_CODES.CREATED).send({
        _id,
        email
      });
    })
    .catch((error) => {
      handleErrors(error, req, res, next);
    });
}

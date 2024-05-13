import { Request, Response, NextFunction } from 'express';
import {User} from "../models/user";
import { handleErrors } from '../errors/handleErrors';
import { HTTP_STATUS_CODES } from '../constants/constants';
import { IRequest } from '../constants/types';

export const findAllUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((user) => {
      res.send({ data: user })
    })
    .catch((error) => {
      handleErrors(error, req, res, next);
    });
}

export const findUserById = (req: Request, res: Response, next: NextFunction) => {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Пользователь не найден' });
      }
      res.send({ data: user })})
    .catch((error) => handleErrors(error, req, res, next));
}

export const upDateUserInfo = (req: IRequest, res: Response, next: NextFunction) => {

  const { name, about } = req.body;


    return User.findByIdAndUpdate(req.user?._id, { name, about }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Пользователь не найден' });
        }

        res.send({ data: user })
      })
      .catch((error) => {
        handleErrors(error, req, res, next);
      });

}

export const upDateUserAvatar = (req: IRequest, res: Response, next: NextFunction) => {

    return User.findByIdAndUpdate(req.user?._id, { avatar: req.body?.avatar }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Пользователь не найден' });
        }
        res.send({ data: user })
      })
      .catch((error) => {
        handleErrors(error, req, res, next);
      });

}


export const findMe = (req: IRequest, res: Response, next: NextFunction) => {

  if (!req.user) {
    return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ message: 'Пользователь не авторизован' });
  }


  const userId = req.user;


  User.findById(userId)
    .then((user) => {

      if (!user) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Пользователь не найден' });
      }

      res.send({ data: user });
    })
    .catch((error) => {

      handleErrors(error, req, res, next);
    });
}
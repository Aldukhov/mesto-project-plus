import { Request, Response, NextFunction } from 'express';
import User from "../models/user";
import IncorrectData from 'errors/incorrectData';
import DataNotFound from 'errors/dataNotFound';

const checkErrors = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.name || !req.body.about || !req.body.avatar) {
      throw new IncorrectData('Имя, аватар, информация о себе обязательны для заполнения');
    }


    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(req.body.avatar)) {
      throw new IncorrectData('Некорректный формат ссылки');
    }


    const maxNameLength = 30;
    if (req.body.name.length > maxNameLength && req.body.about.length > maxNameLength) {
      throw new IncorrectData('Сторка превышает 30 символов');
    }


    next();
  } catch (error) {

    next(error);
  }
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  checkErrors(req, res, () => {
    return User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    })
      .then((user) => res.send({ data: user }))
      .catch(next);
  });
}

export const findAllUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((user) => {
      if (!user) {
        throw new DataNotFound('Нет пользователей')
      } res.send({ data: user })
    })
    .catch(next);
}

export const findUserById = (req: Request, res: Response, next: NextFunction) => {
  return User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send(err));
}

export const upDateUserInfo = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about }, { new: true })
      .then((user) => {
        if (!user) {
          throw new DataNotFound('Нет пользователей с таким id')
        } res.send({ data: user })
      })
      .catch(next);
  }
}

export const upDateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true })
      .then((user) => {
        if (!user) {
          throw new DataNotFound('Нет пользователей с таким id')
        } res.send({ data: user })
      })
      .catch(next);
  }
}
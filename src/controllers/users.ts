import { Request, Response, NextFunction } from 'express';
import User from "../models/user";
import { handleErrors } from 'errors/handleErrors';



export const createUser = (req: Request, res: Response, next: NextFunction) => {

    return User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    })
      .then((user) => res.send({ data: user }))
      .catch((error) => {
        handleErrors(error, req, res, next);
      });
}

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
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send(err));
}

export const upDateUserInfo = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about }, { new: true, runValidators: true })
      .then((user) => {
         res.send({ data: user })
      })
      .catch((error) => {
        handleErrors(error, req, res, next);
      });
  }
}

export const upDateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true, runValidators: true })
      .then((user) => {
        res.send({ data: user })
      })
      .catch((error) => {
        handleErrors(error, req, res, next);
      });
  }
}
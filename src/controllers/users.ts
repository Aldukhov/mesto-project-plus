import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { handleErrors } from "../errors/handleErrors";
import { HTTP_STATUS_CODES } from "../constants/constants";
import { IRequest } from "../constants/types";
import { findMe, findUserById } from "./userById";
import { NotFoundError } from "../errors/customErrors";

export const findAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return User.find({})
    .then((user) => {
      res.send({ data: user });
    })
    .catch((error) => {
      handleErrors(error, req, res, next);
    });
};

export const updateUserInfo = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user?._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }

      res.send({ data: user });
    })
    .catch((error) => {
      handleErrors(error, req, res, next);
    });
};

export const updateUserAvatar = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  return User.findByIdAndUpdate(
    req.user?._id,
    { avatar: req.body?.avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.send({ data: user });
    })
    .catch((error) => {
      handleErrors(error, req, res, next);
    });
};

export { findMe, findUserById };

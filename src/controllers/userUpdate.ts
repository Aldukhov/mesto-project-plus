import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { IRequest } from "../constants/types";
import { NotFoundError } from "../errors/customErrors";
import { checkValid } from "../utils/checkValid";
import { HTTP_STATUS_CODES } from "../constants/constants";
import { body } from "express-validator";

import mongoose from "mongoose";

export const updateUserInfo = [
  body("name").notEmpty().withMessage("Имя обязательно"),
  body("about").notEmpty().withMessage("О себе обязательно"),
  (req: IRequest, res: Response, next: NextFunction) => {
    checkValid(req, res, next);

    if (
      !req.user ||
      !req.user._id ||
      !mongoose.Types.ObjectId.isValid(req.user._id)
    ) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: "Неверный идентификатор пользователя" });
    }

    const { name, about } = req.body;
    return updateUser(
      res,
      next,
      { name, about },
      { new: true, runValidators: true },
      req.user._id
    );
  },
];

export const updateUserAvatar = [
  body("avatar").isURL().withMessage("Некорректный URL для аватара"),
  (req: IRequest, res: Response, next: NextFunction) => {
    checkValid(req, res, next);

    if (
      !req.user ||
      !req.user._id ||
      !mongoose.Types.ObjectId.isValid(req.user._id)
    ) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: "Неверный идентификатор пользователя" });
    }

    return updateUser(
      res,
      next,
      { avatar: req.body.avatar },
      { new: true, runValidators: true },
      req.user._id
    );
  },
];
const updateUser = (
  res: Response,
  next: NextFunction,
  data: any,
  options: any,
  id?: string
) => {
  try {
    const user = User.findByIdAndUpdate(id, data, options);
    if (!user) {
      throw new NotFoundError("Пользователь не найден");
    }

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

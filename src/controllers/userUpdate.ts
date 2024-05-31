import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { IRequest } from "../constants/types";
import { NotFoundError } from "../errors/customErrors";
import { checkValid } from "../utils/checkValid";

export const updateUserInfo = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  checkValid(req, res, next);

  const { name, about } = req.body;
  return updateUser(
    res,
    next,
    { name, about },
    { new: true, runValidators: true },
    req.user?._id
  );
};

export const updateUserAvatar = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  checkValid(req, res, next);

  return updateUser(
    res,
    next,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
    req.user?._id
  );
};

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

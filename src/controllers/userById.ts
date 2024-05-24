import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { IRequest } from "../constants/types";
import { NotFoundError } from "../errors/customErrors";
import { checkValidId } from "../utils/checkValid";

export const findMe = (req: IRequest, res: Response, next: NextFunction) => {
  return findById(res, next, req.user?._id);
};

export const findUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return findById(res, next, req.params.id);
};

const findById = async (res: Response, next: NextFunction, id?: string) => {
  checkValidId(res, id);

  try {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError("Пользователь не найден");
    }

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

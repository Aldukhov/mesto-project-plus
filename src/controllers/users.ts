import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { findMe, findUserById } from "./userById";
import { updateUserAvatar, updateUserInfo } from "./userUpdate";

const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.find({});
    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

export { findMe, findUserById, updateUserAvatar, updateUserInfo, findAllUsers };

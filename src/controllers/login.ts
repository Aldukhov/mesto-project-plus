import { Response, NextFunction } from "express";
import { IRequest } from "../constants/types";
import { User } from "../models/user";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { checkValid } from "../utils/checkValid";

export const login = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  checkValid(req, res, next);
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password, next);
    if (user) {
      const token = jwt.sign({ _id: user._id }, "super-strong-secret", {
        expiresIn: "7d",
      });
      res.send({ token });
    }
  } catch (error) {
    next(error);
  }
};

import { validationResult } from "express-validator";
import { HTTP_STATUS_CODES } from "../constants/constants";
import { NextFunction, Request, Response } from "express";
import { IRequest } from "constants/types";
import mongoose from "mongoose";

export const checkValid = (
  req: Request | IRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  next();
};

export const checkValidId = (res: Response, id?: string) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ message: "Неверный идентификатор пользователя" });
  }
};

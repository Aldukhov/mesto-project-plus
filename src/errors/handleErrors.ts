import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { HTTP_STATUS_CODES } from "../constants/constants";
import { IRequest } from "../constants/types";
import {
  AuthenticationError,
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "./customErrors";

export const handleErrors = (
  error: Error,
  req: Request | IRequest,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof mongoose.Error.CastError) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      message: "Ошибка приведения типов",
      errorCode: "CastError",
      requestBody: req.body,
    });
  } else if (error instanceof mongoose.Error.ValidationError) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      message: "Ошибка валидации данных",
      errorCode: "ValidationError",
      requestBody: req.body,
    });
  } else if (error instanceof NotFoundError) {
    return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
      message: error.message,
      errorCode: "NotFoundError",
      requestBody: req.body,
    });
  } else if (error instanceof BadRequestError) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      message: error.message,
      errorCode: "BadRequestError",
      requestBody: req.body,
    });
  } else if (error instanceof AuthenticationError) {
    return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
      message: error.message,
      errorCode: "AuthenticationError",
      requestBody: req.body,
    });
  } else if (error instanceof ConflictError) {
    return res.status(HTTP_STATUS_CODES.CONFLICT).json({
      message: error.message,
      errorCode: "ConflictError",
      requestBody: req.body,
    });
  } else {
    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: "Произошла внутренняя ошибка сервера",
      errorCode: "InternalServerError",
      requestBody: req.body,
    });
  }
};

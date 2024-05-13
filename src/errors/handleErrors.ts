import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { HTTP_STATUS_CODES } from '../constants/constants';
import { IRequest } from 'constants/types';

export const handleErrors = (error: Error, req: Request | IRequest, res: Response, next: NextFunction) => {
  if (error instanceof mongoose.Error.CastError) {

    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Ошибка приведения типов', errorCode: 'CastError', requestBody: req.body })
  } else if (error instanceof mongoose.Error.ValidationError) {

    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Ошибка валидации данных', errorCode: 'ValidationError', requestBody: req.body });
  } else if (error instanceof mongoose.Error.DocumentNotFoundError) {

    return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Запрашиваемый ресурс не найден', errorCode: 'DocumentNotFoundError', requestBody: req.body });
  } else {

    return next(error);
  }
};
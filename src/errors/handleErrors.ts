import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { HTTP_STATUS_CODES } from '../constants/constants';

export const handleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof mongoose.Error.CastError) {

    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Ошибка приведения типов', errorCode: 'CastError' });
  } else if (error instanceof mongoose.Error.ValidationError) {

    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Ошибка валидации данных', errorCode: 'ValidationError' });
  } else if (error instanceof mongoose.Error.DocumentNotFoundError) {

    return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Запрашиваемый ресурс не найден', errorCode: 'DocumentNotFoundError' });
  } else {

    return next(error);
  }
};
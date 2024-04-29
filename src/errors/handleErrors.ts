import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const handleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof mongoose.Error.CastError) {

    return res.status(400).json({ message: 'Ошибка приведения типов', errorCode: 'CastError' });
  } else if (error instanceof mongoose.Error.ValidationError) {

    return res.status(400).json({ message: 'Ошибка валидации данных', errorCode: 'ValidationError' });
  } else if (error instanceof mongoose.Error.DocumentNotFoundError) {

    return res.status(404).json({ message: 'Запрашиваемый ресурс не найден', errorCode: 'DocumentNotFoundError' });
  } else {

    return next(error);
  }
};
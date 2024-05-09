import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import userRouter from './routes/users'
import cardRouter from './routes/cards'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HTTP_STATUS_CODES } from './constants/constants';
declare global {
  namespace Express {
    interface Request {
      user?: { _id: string }; // Определение типа объекта user
    }
  }
}

const { PORT = 3000, BASE_PATH } = process.env;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '662ae96eba9fa14c24d98831'
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found');
  res.status(HTTP_STATUS_CODES.NOT_FOUND);
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(res.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  res.json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});

app.listen(3000, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});


import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import userRouter from './routes/users'
import cardRouter from './routes/cards'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import IncorrectData from 'errors/incorrectData';
import DataNotFound from 'errors/dataNotFound';

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

app.listen(3000, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});


import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users'
import cardRouter from './routes/cards'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HTTP_STATUS_CODES } from './constants/constants';
import { login } from './controllers/login';
import { createUser } from './controllers/createUser';
import jwt, { JwtPayload } from 'jsonwebtoken';
import auth from './middlewares/auth';


mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { PORT = 3000, BASE_PATH } = process.env;


const app = express();

app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);


app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found');
  res.status(HTTP_STATUS_CODES.NOT_FOUND);
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = res.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  res.status(status);
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


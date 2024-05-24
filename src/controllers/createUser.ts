import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { body } from "express-validator";
import { HTTP_STATUS_CODES } from "../constants/constants";
import { checkValid } from "../utils/checkValid";

export const createUser = [
  body("email").isEmail().withMessage("Некорректный email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен быть не менее 6 символов"),
  (req: Request, res: Response, next: NextFunction) => {
    checkValid(req, res, next);
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(req.body.password, salt))
      .then((hashed) => User.create({ ...req.body, password: hashed }))
      .then((user) => {
        const { email, name, about, avatar } = user;
        res.status(HTTP_STATUS_CODES.CREATED).send({
          email,
          name,
          about,
          avatar,
        });
      })
      .catch((error) => {
        if (error.code === 11000) {
          res.status(HTTP_STATUS_CODES.CONFLICT).send({
            message: "Пользователь с таким email уже существует.",
          });
        } else {
          next(error);
        }
      });
  },
];

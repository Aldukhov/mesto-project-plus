import mongoose, { Model, Document } from "mongoose";
import { NextFunction, Request } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { AuthenticationError } from "../errors/customErrors";

interface IUser {
  name: string;
  about: string;
  avatar?: string;
  email?: string;
  password: string;
}
interface UserModel extends Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string,
    next: NextFunction
  ) => Promise<Document<unknown, any, IUser>>;
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: "Неправильный формат почты",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: function (value: any) {
        // Регулярное выражение для проверки URL
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(value);
      },
      message: "Некорректный URL для аватара",
    },
  },
});

userSchema.statics.findUserByCredentials = async function (
  email: string,
  password: string
) {
  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    return Promise.reject(
      new AuthenticationError("Неправильные почта или пароль")
    );
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return Promise.reject(
      new AuthenticationError("Неправильные почта или пароль")
    );
  }
  return user;
};

const User = mongoose.model<IUser, UserModel>("user", userSchema);

export { User };

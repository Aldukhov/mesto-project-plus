import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { login } from "./controllers/login";
import { createUser } from "./controllers/createUser";
import auth from "./middlewares/auth";
import { handleErrors } from "./errors/handleErrors";
import { NotFoundError } from "./errors/customErrors";
import { validateCreateUser, validateLogin } from "./utils/valid";

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use(express.json());

app.post("/signup", validateCreateUser, createUser);
app.post("/signin", validateLogin, login);

app.use(auth);
app.use(routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new NotFoundError("Not Found");
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handleErrors(err, req, res, next);
});

app.listen(3000, () => {
  console.log("server running on port: ", PORT);
});

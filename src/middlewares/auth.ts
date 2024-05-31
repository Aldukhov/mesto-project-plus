import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HTTP_STATUS_CODES } from "../constants/constants";
import { AuthenticationError } from "../errors/customErrors";

interface ISessionRequest extends Request {
  user?: string | JwtPayload;
}

const handleAuthError = () => {
  throw new AuthenticationError("Необходима авторизация");
};

const extractBearerToken = (header: string) => {
  return header.replace("Bearer ", "");
};

export default (req: ISessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError();
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, "super-strong-secret");
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;
  return next();
};

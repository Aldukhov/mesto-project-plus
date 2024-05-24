import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HTTP_STATUS_CODES } from "../constants/constants";
import { AuthenticationError } from "../errors/customErrors";

interface ISessionRequest extends Request {
  user?: string | JwtPayload;
}

const handleAuthError = (req: ISessionRequest) => {
  throw new AuthenticationError("Необходима авторизация");
};

const extractBearerToken = (header: string) => {
  return header.replace("Bearer ", "");
};

export default (req: ISessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(req);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, "super-strong-secret");
  } catch (err) {
    return handleAuthError(req);
  }

  req.user = payload;
  return next();
};

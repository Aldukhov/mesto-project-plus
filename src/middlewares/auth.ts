import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HTTP_STATUS_CODES } from '../constants/constants';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface ISessionRequest extends Request {
  user?: string | JwtPayload;
}

const handleAuthError = (res: Response, req: ISessionRequest) => {
  res
    .status(HTTP_STATUS_CODES.UNAUTHORIZED)
    .send({ message: 'Необходима авторизация',requestBody: req.body });
};

const extractBearerToken = (header: string) => {
  return header.replace('Bearer ', '');
};

export default (req: ISessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res,req );
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res,req);
  }

  req.user = payload;
  return next();
};
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { InternalServerError } from '../errors';

export const generateToken = (
  payload: any,
  secret: string | undefined = config.jwt.secret,
  expiresIn: string | undefined = config.jwt.expiresIn
): string => {
  if (!secret) throw new InternalServerError('JWT_SECRET is not defined.');
  const token = jwt.sign({ payload }, secret, {
    expiresIn: expiresIn,
  });
  return token;
};

export const validateJWT = (
  token: string,
  secret: jwt.Secret,
  callback: any
) => {
  return jwt.verify(token, secret, callback);
};

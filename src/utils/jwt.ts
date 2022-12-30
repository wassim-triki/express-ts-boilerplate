import jwt from 'jsonwebtoken';
import { InternalServerError } from '../errors';
export const generateToken = (
  payload: any,
  jwtSecret: string | undefined,
  expiresIn: string | undefined
): string => {
  if (!jwtSecret) throw new InternalServerError('JWT_SECRET is not defined.');
  const token = jwt.sign({ payload }, jwtSecret, {
    expiresIn: expiresIn,
  });
  return token;
};

import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { BadRequestError, InternalServerError } from '../errors';
import { IUser } from '../interfaces';
import { sendEmailVerification } from './sendEmailVerification';

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

export const generateAndSetToken = (
  payload: any,
  secret: string,
  expiresIn: string,
  cookieName: string,
  res: Response
) => {
  const token = jwt.sign({ payload }, secret, {
    expiresIn: expiresIn,
  });
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
};

export const handleJWTEmailVerification = (
  err: any,
  decoded: any,
  user: IUser
): void => {
  if (err) {
    sendEmailVerification(user);
    throw new BadRequestError(
      'Verification token expired, Check your email for a new token.'
    );
  }
};

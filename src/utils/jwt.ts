import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../errors';
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

export const verifyJWT = (
  token: string,
  tokenName:
    | 'Access Token'
    | 'Refresh Token'
    | 'Verification Token'
    | 'Password Reset Token'
) => {
  if (!token) throw new UnauthorizedError(`${tokenName} not found.`);
  let payload: any;
  jwt.verify(token, config.jwt.passwordResetSecret, (err, decoded) => {
    if (err) throw new UnauthorizedError(`${tokenName} invalid.`);
    payload = (decoded as JwtPayload).payload;
  });
  if (!payload) throw new UnauthorizedError(`${tokenName} invalid.`);
  return payload;
};

import { NextFunction, Request, Response } from 'express';
import { InternalServerError, UnauthorizedError } from '../errors';
import { config } from '../config/config';
import { generateToken, validateJWT } from '../utils/jwt';
import jwt from 'jsonwebtoken';
import Logger from '../library/Logger';

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) throw new UnauthorizedError('No access token found.');
    if (!refreshToken) throw new UnauthorizedError('No refresh token found.');

    jwt.verify(accessToken, config.jwt.secret, (err: any, decoded: any) => {
      if (err) {
        jwt.verify(
          refreshToken,
          config.jwt.refreshTokenSecret,
          (err: any, decoded: any) => {
            if (err) throw new UnauthorizedError('No access token found.');
            const newAccessToken = generateToken(decoded.payload);
            res.cookie('accessToken', newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            });
          }
        );
      }
      if (decoded) req.userId = decoded.payload._id;
    });
    next();
  } catch (error) {
    next(error);
  }
};

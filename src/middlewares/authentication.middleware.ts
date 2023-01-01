import { NextFunction, Request, Response } from 'express';
import { InternalServerError, UnauthorizedError } from '../errors';
import { config } from '../config/config';
import { generateAndSetToken, generateToken } from '../utils/jwt';
import jwt from 'jsonwebtoken';
import Logger from '../lib/logger';

const checkAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) throw new UnauthorizedError('No access token found.');
  jwt.verify(accessToken, config.jwt.secret, (err: any, decoded: any) => {
    if (err) throw new UnauthorizedError('Access token expired.');
    req.userId = decoded.payload._id;
    next();
  });
};

const checkRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new UnauthorizedError('No refresh token found.');
  }
  jwt.verify(
    refreshToken,
    config.jwt.refreshTokenSecret,
    (err: any, decoded: any) => {
      if (err) throw new UnauthorizedError('Refresh token expired.');
      generateAndSetToken(
        decoded.payload,
        config.jwt.secret,
        config.jwt.expiresIn,
        'accessToken',
        res
      );
      req.userId = decoded.payload._id;
      next();
    }
  );
};

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    checkAccessToken(req, res, next);
  } catch (error) {
    if (
      error instanceof UnauthorizedError &&
      error.message === 'Access token expired.'
    ) {
      checkRefreshToken(req, res, next);
    } else {
      next(error);
    }
  }
};

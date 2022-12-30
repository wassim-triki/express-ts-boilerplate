import { NextFunction, Request, Response } from 'express';
import { InternalServerError, UnauthorizedError } from '../errors';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new UnauthorizedError('No token found.');
    if (!config.jwt.secret) throw new InternalServerError('Token no found.');
    jwt.verify(token, config.jwt.secret, (error: any, decoded: any) => {
      if (error) throw new UnauthorizedError('Token invalid.');
      req.userId = decoded.payload;
      next();
    });
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from 'express';
import { BadRequestError, HttpError } from '../errors/errors';
import Logger from '../library/Logger';

export const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode).json({
    code: err.statusCode,
    message: err.message,
  });
};

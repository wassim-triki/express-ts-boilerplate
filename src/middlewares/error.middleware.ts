import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors';
import Logger from '../lib/Logger';

export const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  Logger.error(err);

  res.status(statusCode).json({
    code: statusCode,
    errorType: err.name || 'ERROR',
    message: err.message,
  });
};

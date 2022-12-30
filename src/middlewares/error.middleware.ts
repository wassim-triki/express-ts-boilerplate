import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors';

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

  res.status(statusCode).json({
    code: statusCode,
    errorType: err.name || 'ERROR',
    message: err.message,
  });
};

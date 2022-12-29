import { Request } from 'express';
import { BadRequestError } from '../../errors';

export const validateLoginInput = (
  req: Request
): { email: string; password: string } => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError('Email and password are required.');
  return { email, password };
};

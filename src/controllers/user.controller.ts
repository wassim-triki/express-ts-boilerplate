import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/errors';
import { IUser } from '../models/IUser';
import { User } from '../models/user.model';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingUser = await User.find({ email: req.body.email });
    if (existingUser) throw new BadRequestError('User already exists.');
    const user: IUser = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error: any) {
    // res.status(400).json({ error: error.message });
    next(error);
  }
};

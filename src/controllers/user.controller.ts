import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';

import { IUser } from '../models/IUser';
import { User } from '../models/user.model';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    throw new Error('dghsdflkjsdflksldf');
    const existingUser = await User.find({ email: req.body.email });
    if (existingUser) throw new BadRequestError('User already exists.');
    const user: IUser = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error: any) {
    // res.status(400).json({ error: error.message });
    next(error);
  }
};

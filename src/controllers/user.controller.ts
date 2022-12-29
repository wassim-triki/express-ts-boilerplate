import { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
import { BadRequestError } from '../errors/BadRequestError';

import { IUser } from '../models/IUser';
import { User } from '../models/user.model';
import { validateUserInput } from '../utils/validation/validateUserInput';

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
    const userData = validateUserInput(req);
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new BadRequestError('User already exists.');
    const user: IUser = await User.create(userData);
    res.status(201).json({ user });
  } catch (error: any) {
    next(error);
  }
};

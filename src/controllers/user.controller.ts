import { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
import { BadRequestError } from '../errors/BadRequestError';

import { IUser } from '../models/IUser';
import { User } from '../models/user.model';
import { validatePassword, validateUsername } from '../utils/validation';

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
  const { username, email, password } = req.body;

  try {
    const usernameError: string | null = validateUsername(username);
    if (usernameError) throw new BadRequestError(usernameError);
    const passwordError: string | null = validatePassword(password);
    if (passwordError) throw new BadRequestError(passwordError);
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError('User already exists.');
    const user: IUser = await User.create({ username, email, password });
    res.status(201).json({ user });
  } catch (error: any) {
    next(error);
  }
};

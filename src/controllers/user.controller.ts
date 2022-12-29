import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import bcrypt from 'bcrypt';
import { IUser } from '../models/IUser';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { InternalServerError } from '../errors';
import { validateLoginInput } from '../utils/validation/validateLoginInput';
import { validateRegistrationInput } from '../utils/validation/validateRegistrationInput';
import { config } from '../config/config';
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
    const userData = validateRegistrationInput(req);
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new BadRequestError('User already exists.');
    const user: IUser = await User.create(userData);
    res.status(201).json({ user });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = validateLoginInput(req);
    const user = await User.findOne({ email });
    if (!user) throw new BadRequestError('Invalid email or password.');
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      throw new BadRequestError('Invalid email or password.');

    if (!config.jwt.secret)
      throw new InternalServerError('JWT_SECRET is not defined.');
    const token = jwt.sign({ id: user._id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(201).json({ message: 'Login successful' });
  } catch (error: any) {
    next(error);
  }
};

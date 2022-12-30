import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { User } from '../models/user.model';
import { config } from '../config/config';
import { generateToken } from '../utils/jwt';
import Logger from '../lib/Logger';
import { IUser } from '../interfaces';
import {
  createUser,
  getAllUsers,
  getUserByEmailAndPassword,
  getUserById,
} from '../services/user.service';
import { NotFoundError } from '../errors';
import {
  validateLoginInput,
  validateRegistrationInput,
} from '../utils/validation';
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();
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
    const user = await createUser(userData);
    const token = generateToken(user, config.jwt.secret, config.jwt.expiresIn);
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(201).json({ message: 'Registration successful.', user });
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
    const user = await getUserByEmailAndPassword(email, password);
    const accessToken = generateToken(user);
    const refreshToken = generateToken(
      user,
      config.jwt.refreshTokenSecret,
      config.jwt.refreshTokenExpiresIn
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(201).json({ message: 'Login successful.', user });
  } catch (error: any) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logout successful.' });
  } catch (error: any) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const user = await getUserById(userId);
    if (!user) throw new NotFoundError('User not found.');
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

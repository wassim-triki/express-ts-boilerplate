import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { User } from '../models/user.model';
import { config } from '../config/config';
import { generateAndSetToken, generateToken } from '../utils/jwt';
import Logger from '../lib/logger';
import { IUser } from '../interfaces';
import {
  createUser,
  deleteAllUsers,
  getAllUsers,
  getUserByEmailAndPassword,
  getUserById,
  saveEmailVerificationToken,
} from '../services/user.service';
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../errors';
import {
  validateLoginInput,
  validateRegistrationInput,
} from '../utils/validation';
import { transporter } from '../lib/mailer';
import { urlJoin } from '../utils/urlJoin';
import * as fs from 'fs';
import * as path from 'path';
import { sendEmailVerification } from '../utils/sendEmailVerification';

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
    await sendEmailVerification(user);
    res
      .status(201)
      .json({ message: 'Registration successful, Verify your email.', user });
    res.end();
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
    if (!user.emailVerified) throw new UnauthorizedError('Email not verified.');
    generateAndSetToken(
      user,
      config.jwt.secret,
      config.jwt.expiresIn,
      'accessToken',
      res
    );
    generateAndSetToken(
      user,
      config.jwt.refreshTokenSecret,
      config.jwt.refreshTokenExpiresIn,
      'refreshToken',
      res
    );

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
    if (!userId) {
      throw new NotFoundError('No userId found.');
    }
    const user = await getUserById(userId);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const deleteUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAllUsers();
    res.status(201).json({ message: 'All users deleted.' });
  } catch (error) {
    next(error);
  }
};

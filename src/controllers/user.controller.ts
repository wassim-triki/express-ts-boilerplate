import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import { User } from '../models/user.model';
import { config } from '../config/config';
import {
  generateAndSetToken,
  generateToken,
  handleJWTEmailVerification,
} from '../utils/jwt';
import Logger from '../lib/logger';
import { IUser } from '../interfaces';
import Handlebars from 'handlebars';
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
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail';
import { compileEmailTemplate } from '../lib/emailTemplates';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
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

const login = async (req: Request, res: Response, next: NextFunction) => {
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

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logout successful.' });
  } catch (error: any) {
    next(error);
  }
};

const getLoggedinUser = async (
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

const deleteUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteAllUsers();
    res.status(201).json({ message: 'All users deleted.' });
  } catch (error) {
    next(error);
  }
};

const handleResetPasswordRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new UnauthorizedError('Email address not found.');
    if (!user.emailVerified) {
      sendEmailVerification(user);
      throw new BadRequestError(
        'Email address not verified. Check your email for a verification link.'
      );
    }

    const resetToken = generateToken(
      user,
      config.jwt.passwordResetSecret,
      config.jwt.passwordResetExpiresIn
    );
    const resetPasswordUrl = '';
    const passwordResetTemplate = compileEmailTemplate(
      '../templates/password-reset.html',
      { username: user.username, resetPasswordUrl, resetToken }
    );

    sendEmail(user.email, 'Reset Your Password.', passwordResetTemplate);
    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { emailVerificationToken } = req.params;
    const user = await User.findOne({ emailVerificationToken });
    if (!user)
      throw new InternalServerError('Could not find user with provided token.');
    if (user.emailVerified)
      res.status(200).json({ message: 'Email already verified.' });
    jwt.verify(
      emailVerificationToken,
      config.jwt.emailVerificationSecret,
      (err, decoded) => handleJWTEmailVerification(err, decoded, user)
    );
    user.emailVerified = true;
    user.emailVerificationToken = '';
    await user.save();
    res
      .status(201)
      .json({ message: 'Verification complete, You may now login.' });
  } catch (error) {
    next(error);
  }
};

const auth = {
  register,
  login,
  logout,
  verifyEmail,
  getLoggedinUser,
};
const passwordReset = {
  request: handleResetPasswordRequest,
};
const admin = {
  getUsers,
  deleteUsers,
};

export { auth, passwordReset, admin };

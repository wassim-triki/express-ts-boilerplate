import { NextFunction, Request, Response } from 'express';
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../errors';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { sendEmailVerification } from '../utils/sendEmailVerification';
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emailVerificationToken } = req.params;
    const user = await User.findOne({ emailVerificationToken });
    if (!user)
      throw new InternalServerError('Could not find user with provided token.');
    if (user.emailVerified)
      res.status(200).json({ message: 'Email already verified.' });
    const isValidToken = jwt.verify(
      emailVerificationToken,
      config.jwt.emailVerificationSecret
    );
    if (!isValidToken) {
      sendEmailVerification(user);
      throw new BadRequestError(
        'Verification token expired, Check your email for a new token.'
      );
    }
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

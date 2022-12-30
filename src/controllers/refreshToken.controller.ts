import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from '../errors';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/jwt';
import { config } from '../config/config';

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) throw new ForbiddenError('No refresh token provided.');
    const user = await User.findOne({ refreshToken });
    if (!user) throw new UnauthorizedError('Invalid refresh token.');
    const accessToken = generateToken(
      user._id,
      config.jwt.secret,
      config.jwt.expiresIn
    );
    const newRefreshToken = crypto.randomBytes(32).toString('hex');
    await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });
    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
};

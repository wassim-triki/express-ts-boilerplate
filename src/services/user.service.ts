import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../errors';
import { IUser } from '../interfaces';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { IClientUser } from '../interfaces/IClientUser';

export const createUser = async (userData: any): Promise<IUser> => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new BadRequestError('User already exists.');
  return await User.create(userData);
};

export const getUserByEmailAndPassword = async (
  email: string,
  password: string
): Promise<IClientUser> => {
  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError('Invalid email or password.');
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new BadRequestError('Invalid email or password.');

  return user;
};

export const getAllUsers = async (): Promise<IClientUser[]> => {
  const users = await User.find();
  return users;
};

export const getUserById = async (
  userId: string
): Promise<IClientUser | null> => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new NotFoundError('User not found.');
  return user;
};

export const saveEmailVerificationToken = async (
  user: IUser,
  emailVerificationToken: string
) => {
  try {
    await User.findByIdAndUpdate(user._id, { emailVerificationToken });
  } catch (error) {
    throw new InternalServerError('Error saving email verification token.');
  }
};

export const deleteAllUsers = async () => {
  await User.deleteMany();
};

export const updatePassword = async (userId: string, password: string) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new UnauthorizedError('Email address not found.');
  user.password = password;
  await user.save();
};

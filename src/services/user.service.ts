import { BadRequestError } from '../errors';
import { IUser } from '../interfaces';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import { omitProperty } from '../utils/omitProperty';
import { Types } from 'mongoose';

export const createUser = async (userData: any): Promise<IUser> => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new BadRequestError('User already exists.');
  const createdUser = await User.create(userData);
  const user = omitProperty('password', createdUser.toObject());
  return user;
};

export const getUserByEmailAndPassword = async (
  email: string,
  password: string
): Promise<IUser> => {
  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError('Invalid email or password.');
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new BadRequestError('Invalid email or password.');

  return omitProperty('password', user.toObject());
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return User.find().select('-password');
};

export const getUserById = async (userId: string): Promise<any> => {
  return User.findOne({ _id: userId }).select('-password');
};

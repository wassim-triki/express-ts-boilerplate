import { BadRequestError, NotFoundError } from '../errors';
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

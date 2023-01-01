import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  emailVerified: boolean;
  emailVerificationToken: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

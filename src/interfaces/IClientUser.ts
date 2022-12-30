import { IUser } from './IUser';

export interface IClientUser extends Omit<IUser, 'password'> {
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

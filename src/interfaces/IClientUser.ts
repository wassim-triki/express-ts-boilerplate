import { IUser } from './IUser';

export interface IClientUser extends Omit<IUser, 'password'> {}

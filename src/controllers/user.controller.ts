import { Request, Response } from 'express';
import { IUser } from '../models/IUser';
import { User } from '../models/user.model';

export const register = async (req: Request, res: Response) => {
  try {
    const user: IUser = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

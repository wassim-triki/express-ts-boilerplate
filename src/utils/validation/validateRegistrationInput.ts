import { Request } from 'express';
import { BadRequestError } from '../../errors';
import { validatePassword } from './validatePassword';
import { validateUsername } from './validateUsername';

export const validateRegistrationInput = (
  req: Request
): { username: string; email: string; password: string } => {
  const { email, username, password } = req.body;
  const usernameError: string | null = validateUsername(username);
  if (usernameError) throw new BadRequestError(usernameError);
  const passwordError: string | null = validatePassword(password);
  if (passwordError) throw new BadRequestError(passwordError);
  return { username, email, password };
};

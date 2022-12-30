import { Request } from 'express';
import { config } from '../config/config';
import { BadRequestError } from '../errors';

export const validateLoginInput = (
  req: Request
): { email: string; password: string } => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError('Email and password are required.');
  return { email, password };
};

export const validatePassword = (pwd: string): string | null => {
  if (!pwd) return 'Password is required.';
  if (
    pwd.length < config.validation.password.minLength ||
    pwd.length > config.validation.password.maxLength
  )
    return `Password must be between ${config.validation.password.minLength} and ${config.validation.password.maxLength} characters.`;
  return null;
};

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

export const validateUsername = (username: string): string | null => {
  if (!username) return 'Username is required.';
  return null;
};

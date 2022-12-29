import { config } from '../config/config';

const validatePassword = (pwd: string): string | null => {
  if (!pwd) return 'Password is required.';
  if (
    pwd.length < config.validation.password.minLength ||
    pwd.length > config.validation.password.maxLength
  )
    return `Password must be between ${config.validation.password.minLength} and ${config.validation.password.maxLength} characters.`;
  return null;
};
const validateUsername = (username: string): string | null => {
  if (!username) return 'Username is required.';
  return null;
};

export { validatePassword, validateUsername };

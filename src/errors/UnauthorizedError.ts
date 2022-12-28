import { HttpError } from './HttpError';

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, 'UnauthorizedError', 401);
  }
}

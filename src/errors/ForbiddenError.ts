import { HttpError } from './HttpError';

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, 'ForbiddenError', 403);
  }
}

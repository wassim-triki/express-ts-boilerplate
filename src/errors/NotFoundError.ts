import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 'NotFoundError', 404);
  }
}

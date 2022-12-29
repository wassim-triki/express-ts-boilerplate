import { HttpError } from './HttpError';

export class TooManyRequestsError extends HttpError {
  constructor(message: string) {
    super(message, 'TooManyRequestsError', 429);
  }
}

import rateLimit from 'express-rate-limit';
import { TooManyRequestsError } from '../errors/TooManyRequestsError';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests, please try again later.',
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(options.message);
  },
});

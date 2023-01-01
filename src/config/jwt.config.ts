export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '5m',
  refreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh-token-secret',
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '10m',
  emailVerificationSecret:
    process.env.JWT_EMAIL_VERIFICATION_SECRET || 'email-verification-secret',
  emailVerificationExpiresIn:
    process.env.JWT_EMAIL_VERIFICATION_EXPIRES_IN || '1d',
};

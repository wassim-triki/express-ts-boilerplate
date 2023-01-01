export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'secret',
  expiresIn: process.env.JWT_EXPIRES_IN,
  refreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh-token-secret',
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
};

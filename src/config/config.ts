import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
}

import { bcryptConfig } from './bcrypt.config';
import { jwtConfig } from './jwt.config';
import { mongoConfig } from './mongo.config';
import { nodemailerConfig } from './nodemailer.config';
import { serverConfig } from './server.config';
import { validationConfig } from './validation.config';

export const config = {
  mongo: mongoConfig,
  server: serverConfig,
  bcrypt: bcryptConfig,
  validation: validationConfig,
  jwt: jwtConfig,
  nodemailer: nodemailerConfig,
};

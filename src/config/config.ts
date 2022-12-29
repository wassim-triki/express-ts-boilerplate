import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
}

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster.bouikhn.mongodb.net`;

const PORT = Number(process.env.PORT) || 8080;

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

export const config = {
  mongo: {
    uri: MONGO_URI,
  },
  server: {
    port: PORT,
  },
  bcrypt: {
    saltRounds: SALT_ROUNDS,
  },
  validation: {
    password: {
      minLength: 8,
      maxLength: 50,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};

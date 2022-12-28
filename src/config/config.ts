import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster.bouikhn.mongodb.net`;

const PORT = process.env.PORT || 8080;

export const config = {
  mongo: {
    uri: MONGO_URI,
  },
  server: {
    port: PORT,
  },
};

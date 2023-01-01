const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster.bouikhn.mongodb.net`;

export const mongoConfig = {
  uri: MONGO_URI,
};

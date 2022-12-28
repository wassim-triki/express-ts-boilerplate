import mongoose, { Mongoose } from 'mongoose';
import { config } from './config/config';
import Logger from './library/Logger';

export const connectToDb = async (): Promise<Mongoose> => {
  try {
    const mongooseConnection = await mongoose.connect(config.mongo.uri);
    Logger.info('Successfully connected to database');
    return mongooseConnection;
  } catch (error) {
    Logger.error('Error connecting to database:');
    Logger.error(error);
    return mongoose;
  }
};

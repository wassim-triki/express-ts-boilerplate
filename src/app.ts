import express, { Application, Request, Response } from 'express';
import mongoose, { Mongoose } from 'mongoose';
import { config } from './config/config';
import Logger from './library/Logger';
import { errorMiddleware } from './middlewares/errorMiddleware';
import userRoutes from './routes/users.routes';

export const app: Application = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(errorMiddleware);

//DB connection
const connectToDb = async (): Promise<Mongoose> => {
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
connectToDb();

//Routes
app.use('/api/users', userRoutes);
app.use('/', (req: Request, res: Response) => {
  res.send('Hello 🌍!');
});

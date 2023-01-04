import express, { Application, NextFunction, Request, Response } from 'express';
import mongoose, { Mongoose } from 'mongoose';
import { config } from './config/config';
import { NotFoundError } from './errors';
import Logger from './lib/logger';
import { authentication } from './middlewares/authentication.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import userRoutes from './routes/users.routes';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

export const app: Application = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});
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

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Resource not found.'));
}, errorMiddleware);

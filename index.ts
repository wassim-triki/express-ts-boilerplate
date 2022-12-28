import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { config } from './src/config/config';
import Logger from './src/library/Logger';

mongoose
  .connect(config.mongo.uri, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logger.info('Database Connection Successful.');
  })
  .catch((error) => {
    Logger.error('Database Connection Error.');
    Logger.error(error);
  });
//import routes
import userRoute from './src/routes/users.route';
const app: Application = express();

const PORT: number = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoute);

app.use('/', (req: Request, res: Response) => {
  res.send('Hello 🌍!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

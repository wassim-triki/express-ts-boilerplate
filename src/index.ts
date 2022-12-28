import express, { Application, Request, Response } from 'express';
import { connectToDb } from './app';
import { config } from './config/config';
import userRoutes from './routes/users.routes';

const app: Application = express();
const port: number = config.server.port;
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB connection
connectToDb();

//Routes
app.use('/api/users', userRoutes);
app.use('/', (req: Request, res: Response) => {
  res.send('Hello 🌍!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

import express, { Application, Request, Response } from 'express';

const app: Application = express();

const PORT: number = 8080;

app.use('/', (req: Request, res: Response) => {
  res.send('Hello 🌍!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

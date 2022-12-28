import { app } from './app';
import { config } from './config/config';

const port: number = config.server.port;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

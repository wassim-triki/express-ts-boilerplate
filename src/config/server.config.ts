const port = Number(process.env.PORT) || 8080;
export const serverConfig = {
  port,
  baseUrl: process.env.BASE_URL || `http://localhost:${port}`,
};

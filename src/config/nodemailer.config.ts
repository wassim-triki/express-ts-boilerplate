export const nodemailerConfig = {
  host: process.env.NODEMAILER_HOST || 'localhost',
  port: Number(process.env.NODEMAILER_PORT) || 1025,
};

export const nodemailerConfig = {
  host: process.env.NODEMAILER_HOST || 'smtp.mailtrap.io',
  port: Number(process.env.NODEMAILER_PORT) || 2525,
  secure: Boolean(process.env.NODEMAILER_SECURE) || true,
  auth: {
    user: process.env.NODEMAILER_USER || 'mailtrap-user-id',
    password: process.env.NODEMAIER_PASSWORD || 'mailtrap-password',
  },
};

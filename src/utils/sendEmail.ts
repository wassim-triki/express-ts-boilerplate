import { config } from '../config/config';
import Logger from '../lib/logger';
import { transporter } from '../lib/mailer';

export const sendEmail = (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: config.app.email,
    to,
    subject,
    html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    } else {
      Logger.info(`Email sent: ${info.response}`);
    }
  });
};

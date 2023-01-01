import { config } from '../config/config';
import { saveEmailVerificationToken } from '../services/user.service';
import { generateToken } from './jwt';
import { urlJoin } from './urlJoin';
import fs from 'fs';
import path from 'path';
import { transporter } from '../lib/mailer';
import Logger from '../lib/logger';
import { IUser } from '../interfaces';
import Handlebars from 'handlebars';

export const sendEmailVerification = async (user: IUser) => {
  const emailVerificationToken = generateToken(
    user,
    config.jwt.emailVerificationSecret,
    config.jwt.emailVerificationExpiresIn
  );
  await saveEmailVerificationToken(user, emailVerificationToken);
  user.emailVerificationToken = emailVerificationToken;

  const verifyEmailUrl = urlJoin(
    config.server.baseUrl,
    '/api/verify-email/',
    emailVerificationToken
  );
  const verifyEmailTemplate = fs.readFileSync(
    path.resolve(__dirname, '../templates/verify-email.html'),
    'utf8'
  );
  const mailOptions = {
    from: config.app.email,
    to: user.email,
    subject: 'Verify Your Email Address',
    html: Handlebars.compile(verifyEmailTemplate)({ verifyEmailUrl }),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    } else {
      Logger.info(`Email sent: ${info.response}`);
    }
  });
};

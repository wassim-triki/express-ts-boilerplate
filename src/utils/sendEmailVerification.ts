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
import { sendEmail } from './sendEmail';
import { compileEmailTemplate } from '../lib/emailTemplates';

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
    '/api/users/verify-email/',
    emailVerificationToken
  );
  const verifyEmailTemplate = compileEmailTemplate(
    '../templates/verify-email.html',
    { verifyEmailUrl }
  );

  sendEmail(user.email, 'Verify Your Email Address', verifyEmailTemplate);
};

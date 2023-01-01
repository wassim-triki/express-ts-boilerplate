import nodemailer from 'nodemailer';
import { config } from '../config/config';

export const transporter = nodemailer.createTransport(config.nodemailer);

import nodemailer from 'nodemailer';
import { config } from '../config/config';

const transporter = nodemailer.createTransport(config.nodemailer);

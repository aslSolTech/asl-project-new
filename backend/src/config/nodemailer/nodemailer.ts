import { createTransport } from 'nodemailer';
import { GMAIL_ID, GMAIL_APP_PASSWORD } from '../dotenv/dotenv.js';

export interface SendMailPayload {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface TransportOptions {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
  secure: boolean;
}

const transportOptions: TransportOptions = {
  service: 'gmail',
  auth: {
    user: GMAIL_ID,
    pass: GMAIL_APP_PASSWORD,
  },
  secure: true,
};

const transporter = createTransport(transportOptions);

export const sendMail = async ({ to, subject, text, html }: SendMailPayload) => {
  return await transporter.sendMail({ from: GMAIL_ID, to, subject, text, html });
};

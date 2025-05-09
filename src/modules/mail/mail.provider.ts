// mail.providers.ts
import { Provider } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envConfig } from 'src/core/config';

export const MAIL_TRANSPORTER = 'MAIL_TRANSPORTER';

export const mailProviders: Provider[] = [
  {
    provide: MAIL_TRANSPORTER,
    useFactory: async () => {
      return nodemailer.createTransport({
        host: envConfig().mail.smtp,
        port: envConfig().mail.host,
        secure: false,
        auth: {
          user: envConfig().mail.user,
          pass: envConfig().mail.password,
        },
      });
    },
  },
];

// mail.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { MAIL_TRANSPORTER } from '../mail.provider';
import { envConfig } from 'src/core/config';

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_TRANSPORTER) private readonly transporter: Transporter,
  ) {}

  async sendVerificationEmail(to: string, token: string) {
    const url = `${envConfig().frontendUrl}/auth/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: `"Agiliza360" <${envConfig().mail.user}>`,
      to,
      subject: 'Email Verification',
      html: `Haz clic <a href="${url}">aqui</a> para verificar tu correo electronico.`,
    });
  }
}

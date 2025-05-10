import { Module } from '@nestjs/common';
import { mailProviders } from './mail.provider';
import { MailService } from './services/auth-verification.service';

@Module({
  providers: [...mailProviders, MailService],
  exports: [MailService],
})
export class MailModule {}

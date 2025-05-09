import { Module } from '@nestjs/common';
import { mailProviders } from './mail.provider';

@Module({
  providers: [...mailProviders, ],
  exports: [],
})
export class MailModule {}

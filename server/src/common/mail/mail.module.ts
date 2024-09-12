import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import mailConfig from 'src/config/mail.config';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory : mailConfig
    }),
  ],
  providers: [MailService],
  exports : [MailService]
})
export class MailModule {}
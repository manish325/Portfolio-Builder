import { registerAs } from "@nestjs/config";
import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export default registerAs("mailTransporter", () : MailerOptions => ({
    transport: {
      service : 'gmail',
      from : process.env.EMAIL,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    },
    template: {
        dir: "C:/Users/coditas/Desktop/hydrafacial-store-locator/src/common/mail/templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
}))
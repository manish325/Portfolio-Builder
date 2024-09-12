import { Injectable } from '@nestjs/common';
import {MailerService, ISendMailOptions} from "@nestjs-modules/mailer";
import { ConfigService } from '@nestjs/config';


@Injectable()
export class MailService {


    constructor(private readonly mailService : MailerService, private configService : ConfigService) {}
}
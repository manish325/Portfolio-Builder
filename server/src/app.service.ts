import { Injectable, OnModuleInit } from '@nestjs/common';
import { createUser } from './common/_helpers';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {

    setTimeout(() => {
    //   createUser()
    // .then(() => {
    //   console.log("User created successfully.");
    // })
    // .catch((error) => {
    //   console.error("Error creating user:", error);
    // });
    }, 2000);
  }
  getHello(): string {
    return 'Hello World!';
  }
}

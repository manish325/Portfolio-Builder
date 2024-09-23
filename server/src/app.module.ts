import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mailConfig from './config/mail.config';
import databaseConfig from './config/database.config';
import googleConfig from './config/google.config';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { Project } from './Entities/Project.Entity';
import { UserModule } from './modules/user/user.module';
import { UserSeederService } from './common/services/userseed.service';
import { User } from './Entities/User.Entity';
import { Technology } from './Entities/Technology.Entity';
import { Media } from './Entities/media.Entity';
import { Certificate } from 'crypto';
import { Skill } from './Entities/Skill.Entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      load : [mailConfig, databaseConfig, googleConfig, jwtConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig(),
    }),
    TypeOrmModule.forFeature([Project, User, Technology, Media, Certificate, Skill]),
    AuthModule,
    Project,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, UserSeederService],
})
export class AppModule {}

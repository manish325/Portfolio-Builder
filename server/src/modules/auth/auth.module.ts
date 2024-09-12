import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/Entities/User.Entity";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "src/common/strategies/jwt.strategy";
import { Project } from "src/Entities/Project.Entity";

@Module({
    imports : [
        // ConfigModule.forFeature([]),
        TypeOrmModule.forFeature([User, Project]),
        JwtModule.registerAsync({
            useFactory : (configService : ConfigService) => {
                return {
                    secret : configService?.get('secret') || process.env.JWT_SECRET,
                    signOptions : { expiresIn : configService?.get('expiresIn') || process.env.JWT_EXPIRES_IN }
                }
            }
        }),
        PassportModule.register({
            defaultStrategy : 'jwt'
        }),
    ],
    controllers : [AuthController],
    providers : [AuthService, JwtStrategy]
})
export class AuthModule{

}
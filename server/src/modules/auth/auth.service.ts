import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Entities/User.Entity";
import { Repository } from "typeorm";
import { OAuth2Client } from "google-auth-library"
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { LoginDto, RegisterDto } from "src/common/dto/auth.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private client: OAuth2Client;
    private readonly saltRounds = 10;
    constructor(
        // private jwtService: JwtService,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private configService: ConfigService,
        private jwtService: JwtService
    ) {
        this.client = new OAuth2Client(this.configService.get<string>('GOOGLE_CLIENT_ID'));
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async generateToken(payload : LoginDto) : Promise<String> {
        try{
            console.log("Logging the payload : ", payload);
            return await this.jwtService.signAsync({...payload});
        } catch(e) {
            console.log("Logging the error : ", e);
        }
    }

    async createUser(user: User) {
        return await this.userRepo.save(user);
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepo.findOne({ where: { email } });
    }

    async register(user: RegisterDto) {
        const newUser: User = new User();
        newUser.email = user.email;
        newUser.password = await this.hashPassword(user.password);
        newUser.name = user.fullName;
        return await this.createUser(newUser);
    }

    async createToken(user: User) {
        return this.jwtService.sign({ userId: user.id, email: user.email });
    }

    async googleLogin(token: string) {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: this.configService.get<string>('GOOGLE_CLIENT_ID')
        });
        const payload = ticket.getPayload();
        console.log("Logging the payload : ", payload);
        const user = await this.userRepo.findOne({ where: { email: payload.email } });
        if (!user) {
            const newUser = new User();
            newUser.email = payload.email;
            newUser.name = payload.name;
            newUser.profilePicture = payload.picture;
            const createdUser = await this.createUser(newUser);
            return this.createToken(createdUser);
        }
        return this.createToken(user);
    }

    async validateToken(token: string) {
        return this.jwtService.verify(token);
    }
}
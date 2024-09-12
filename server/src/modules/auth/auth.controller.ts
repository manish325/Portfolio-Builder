import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { GoogleLoginDto, LoginDto, RegisterDto } from "src/common/dto/auth.dto";
import { AuthService } from "./auth.service";
import { AppResponse } from "src/common/types/response";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_PHRASES } from "src/common/constants/response-phrases";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post('login')
    async login(
        @Body() body: LoginDto
    ) {
        try {
            const { email, password } = body;
            const user = await this.authService.getUserByEmail(email);
            if (!user) {
                return new AppResponse(
                    null,
                    RESPONSE_PHRASES.USER_NOT_FOUND,
                    StatusCodes.BAD_REQUEST,
                    false
                )
            }
            const hashedPassword = user.password;
            const isPasswordMatched = await this.authService.comparePasswords(password, hashedPassword);
            if (!isPasswordMatched)
                return new AppResponse(
                    null,
                    RESPONSE_PHRASES.INVALID_CREDENTIALS,
                    StatusCodes.BAD_REQUEST,
                    false
            )
            const authToken = await this.authService.generateToken(body);
            return new AppResponse(
                {
                    authToken
                },
                RESPONSE_PHRASES.LOGIN_SUCCESS,
                StatusCodes.OK,
                true
            )
        } catch (e) {
            console.error(e);
            return new AppResponse(
                null,
                RESPONSE_PHRASES.INTERNAL_SERVER_ERROR,
                StatusCodes.INTERNAL_SERVER_ERROR,
                false
            )
        }
        
    }

    @Post('register')
    async register(
        @Body() body: RegisterDto
    ) {
        try {
            const { email } = body;
            const existingUser = await this.authService.getUserByEmail(email);
            if (existingUser) {
                // throw new Error('User already exists');
                return new AppResponse(
                    {},
                    RESPONSE_PHRASES.EMAIL_ALREADY_EXISTS,
                    StatusCodes.BAD_REQUEST,
                    false
                )
            }
            const user = await this.authService.register(body);
            return new AppResponse(
                {},
                RESPONSE_PHRASES.REGISTRATION_SUCCESS,
                StatusCodes.OK,
                true
            )
        } catch (e) {
            console.log(e);
            return new AppResponse(
                e,
                RESPONSE_PHRASES.INTERNAL_SERVER_ERROR,
                StatusCodes.INTERNAL_SERVER_ERROR,
                false
            )
        }
    }

    @Get('test')
    test() {
        return "This is a test";
    }

    @Post('google-login')
    async googleLogin(
        @Body()
        body: GoogleLoginDto
    ) {
        const { token } = body;
        const authToken = await this.authService.googleLogin(token);
        console.log(authToken);
        return new AppResponse(
            { authToken },
            RESPONSE_PHRASES.LOGIN_SUCCESS,
            StatusCodes.OK,
            true
        )

    }

    @Post('validate-token')
    async validateToken(
        @Body() body: GoogleLoginDto
    ) {
        try {
            const { token } = body;
            const isValid = await this.authService.validateToken(token) ? true : false;
            if(isValid)
            return new AppResponse(
                true,
                RESPONSE_PHRASES.VALIDATION_SUCCESS,
                StatusCodes.OK,
                true
            )
            else return new AppResponse(
                false,
                RESPONSE_PHRASES.VALIDATION_FAILED,
                StatusCodes.BAD_REQUEST,
                false
            )
        } catch (e) {
            return new AppResponse(
                false,
                RESPONSE_PHRASES.VALIDATION_FAILED,
                StatusCodes.BAD_REQUEST,
                false
            )
        }
    }
}
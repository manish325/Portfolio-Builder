import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
} from "class-validator"

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('IN')
    phone : string;

}

export class GoogleLoginDto {
    @IsString()
    @IsNotEmpty()
    token: string;
}
import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AppResponse } from "src/common/types/response";
import { RESPONSE_PHRASES } from "src/common/constants/response-phrases";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('test')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    test(@Request() req) {
        console.log(req.user);
        return "Test Successful!";
    }

    @Get('data')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getUserData(@Request() req) {
        try {
            const userData = await this.userService.getUserData(req.user.userId);
            return new AppResponse(
                userData,
                RESPONSE_PHRASES.LOGIN_SUCCESS,
                StatusCodes.OK,
                true
            )
        } catch(e) {
            console.error(e);
            return new AppResponse(
                e,
                e.message || e.error.message || RESPONSE_PHRASES.INTERNAL_SERVER_ERROR,
                StatusCodes.INTERNAL_SERVER_ERROR,
                false
            )
        }
    }
}
import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AppResponse } from "src/common/types/response";
import { RESPONSE_PHRASES } from "src/common/constants/response-phrases";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";
import { UserProfileDataDto } from "./user.dto";
import { JwtAuthGuard } from "src/common/guards/jwt.guard";
import { AuthenticatedRequest } from "src/common/types/jwt.types";

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('test')
    @ApiBearerAuth()
    test(@Request() req) {
        console.log(req.user);
        return "Test Successful!";
    }

    @Get('data')
    @ApiBearerAuth()    
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

    @Post('saveProfileData')
    @ApiBearerAuth()
    async saveUserData(@Req() request : AuthenticatedRequest,  @Body() userData : UserProfileDataDto) {
        try {
            const user = request.user;
            // return {
            //     user
            // }
            return await this.userService.saveUserProfileData(userData);

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
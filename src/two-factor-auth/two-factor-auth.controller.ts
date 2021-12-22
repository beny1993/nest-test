import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    NotFoundException,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {TwoFactorAuthService} from "./two-factor-auth.service";
import {AuthGuard} from "@nestjs/passport";
import {Response} from 'express';
import {UserRepository} from "../auth/user.repository";
import {TwoFactorCodeDto} from "../domain/dto/two-factor-code.dto";
import {GetUser} from "../auth/auth-user.decorator";
import {JwtPayload} from "../domain/jwt-payload.interface";
import {UserResponseDto} from "../domain/dto/user.response.dto";


@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthController {
    constructor(
        private twoFactorAuthService: TwoFactorAuthService,
        private userRepository: UserRepository
    ) {
    }

    @Post('generate')
    @UseGuards(AuthGuard())
    async register(@Res() response: Response, @Req() request: any) {
        const {otpauthurl} = await this.twoFactorAuthService.setTwoFactorAuthenticationSecret(request.user);
        return this.twoFactorAuthService.pipeQrCodeStream(response, otpauthurl)
    }


    @Post('turnOn')
    @HttpCode(200)
    @UseGuards(AuthGuard())
    async turnOnTwoFactorAuthentication(@Req() request: any, @Body() twoFactorCode: TwoFactorCodeDto) {
        const isCodeValid = this.twoFactorAuthService.isTwoFactorAuthenticationValid(twoFactorCode.code, request.user)
        if (!isCodeValid) {
            throw new UnauthorizedException('wrong authentication code');
        }
        await this.userRepository.turnOnTwoFactorAuthentication(request.user.id)
    }


    @Post('authenticate')
    @UseGuards(AuthGuard())
    async authenticate(
        @GetUser() payload: UserResponseDto,
        @Body() twoFactorCode: TwoFactorCodeDto
    ) {
        const user = await this.userRepository.findOne({
            where: {
                username : payload.name
            }
        })
        if (!user) {
            throw new NotFoundException('user does not exists')
        }

        const isCodeValid = this.twoFactorAuthService.isTwoFactorAuthenticationValid(twoFactorCode.code, user.twoFactorAuthenticationSecret)

        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }

        return payload;
    }

}

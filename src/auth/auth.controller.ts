import {Body, Controller, Post, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthCredentialDto} from "../domain/dto/auth-credential.dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {User} from "../domain/entity/user-entity";
import {GetUser} from "./auth-user.decorator";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
        return  this.authService.signUp(authCredentialDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        return  this.authService.signIn(authCredentialDto)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User ){
        console.log(user);
    }
}


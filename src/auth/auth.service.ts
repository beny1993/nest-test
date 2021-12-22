import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthCredentialDto} from "../domain/dto/auth-credential.dto";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "../domain/jwt-payload.interface";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {
    }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.signUp(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string, isTwoFactorExist: boolean }> {

        const username = await this.userRepository.validateUserPassword(authCredentialDto)
        const isTwoFactorExist = await this.userRepository.isTwoFactorAuthenticationEnabled(authCredentialDto)

        if (!username) {
            throw new UnauthorizedException("invalid credential")
        }

        const payload: JwtPayload = { username }


        const accessToken = this.jwtService.sign(payload);
        return {accessToken, isTwoFactorExist};
    }
}

import {Injectable} from '@nestjs/common';
import {UserRepository} from "../auth/user.repository";
import {User} from "../domain/entity/user-entity";
import {authenticator} from "otplib";
import * as qrcode from 'qrcode';
import {Response} from 'express';

@Injectable()
export class TwoFactorAuthService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {
    }


    async setTwoFactorAuthenticationSecret(user: User) {
        const secret = authenticator.generateSecret();

        const otpauthurl = authenticator.keyuri(user.username, 'myApp', secret)

        await this.userRepository.setTwoFactorAuthenticationSecret(secret, user.id)

        return {
            secret,
            otpauthurl
        }
    }


    async pipeQrCodeStream(stream: Response, otpauthurl: string) {
        return qrcode.toFileStream(stream, otpauthurl);
    }

     isTwoFactorAuthenticationValid(twoFactorAuthCode: string, twoFaSecret: string): boolean {
        return authenticator.verify({
            token: twoFactorAuthCode,
            secret: twoFaSecret
        })
    }



}

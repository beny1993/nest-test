import {Module} from '@nestjs/common';
import {TwoFactorAuthService} from "./two-factor-auth.service";
import {TwoFactorAuthController} from "./two-factor-auth.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "../auth/user.repository";
import {PassportModule} from "@nestjs/passport";


@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule.register({defaultStrategy: 'jwt'}),
    ],
    controllers: [TwoFactorAuthController],
    providers: [TwoFactorAuthService]
})

export class TwoFactorAuthModule {
}

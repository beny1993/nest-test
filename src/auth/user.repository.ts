import {EntityRepository, Repository} from "typeorm";
import {User} from "../domain/entity/user-entity";
import {AuthCredentialDto} from "../domain/dto/auth-credential.dto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    private hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        const {username, password} = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt);

        try {
            await user.save();
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException('UserName already exists')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }


    async validateUserPassword(authCredentialDto: AuthCredentialDto): Promise<string> {
        const {password, username} = authCredentialDto;
        const user = await this.findOne({username: username});

        if (user && await user.validatePassword(password)) {
            return user.username
        } else {
            return null;
        }
    }


    async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
        return this.update(userId, {twoFactorAuthenticationSecret: secret})
    }


    async turnOnTwoFactorAuthentication(userId: number) {
        return await this.update(userId, {isTwoFactorAuthenticationEnabled: true})
    }


    async isTwoFactorAuthenticationEnabled(authCredentialDto: AuthCredentialDto){
        const { username } = authCredentialDto;

        const user = await this.findOne({username: username})

        if(user){
            return user.isTwoFactorAuthenticationEnabled
        }
    }

}
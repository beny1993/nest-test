import {PassportStrategy} from "@nestjs/passport"
import { ExtractJwt, Strategy } from 'passport-jwt';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtPayload} from "../domain/jwt-payload.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){ // we use super here to add these key values to passportStrategy as strategy
        //it will be known by authgard and use gard
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "topSecret51"
        })
    }

    async validate(payload: JwtPayload){
        const user = await this.userRepository.findOne({username: payload.username})
        if(!user){
            throw new UnauthorizedException()
        }

        return user;
    }



}
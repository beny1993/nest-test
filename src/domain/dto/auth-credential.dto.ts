import {IsString, Matches, MaxLength, MinLength} from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/,{message: 'password is to weak'})
    password: string;
}
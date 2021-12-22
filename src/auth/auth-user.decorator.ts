import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {UserResponseDto} from "../domain/dto/user.response.dto";

export const GetUser = createParamDecorator((data, ctx:ExecutionContext): any => {
    const req = ctx.switchToHttp().getRequest()
    return new UserResponseDto(req.user);
});
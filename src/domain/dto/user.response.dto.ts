import {User} from "../entity/user-entity";


//for changeing the name of user or
export class UserResponseDto {
    constructor(data: User) {
        this.id = data.id;
        this.name = data.username;
    }
    id:number;
    name:string
}

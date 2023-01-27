import {UserEntity} from "../../domain";
import {UserDTO} from "../entities/user.dto";

export class UserResponse implements UserDTO{

    id: string;
    name: string;
    email: string;
    lastname: string;

    constructor(id: string, email: string, name: string, lastname: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastname = lastname;
    }

    static fromUser(user: UserEntity): UserResponse {
        return new UserResponse(
            user.userId,
            user.email,
            user.name,
            user.lastname
        )
    }
}
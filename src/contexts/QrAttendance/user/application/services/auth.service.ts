import {UserEntity} from "../../domain/user.entity";

export interface AuthService {
    findUserById(id: string): Promise<UserEntity | null>;
    findUserByEmail(email: string): Promise<UserEntity | null>;
    verifyCredentials(email: string, password: string): Promise<Boolean | null>;
}

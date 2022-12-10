import { UserEntity } from "./user.entity";
import {UserQuery} from "./user.query";

export interface UserRepository{
    findUserById(userId: string): Promise<UserEntity | null>;
    createUser(user: UserEntity): Promise<UserEntity | null>;
    updateUser(fields: UserQuery, userId: string): Promise<UserEntity | null>;
    deleteUser(userId: string): Promise<UserEntity | null>;
    findUserBy(query: any): Promise<UserEntity | null>;
    listUsers(): Promise<UserEntity | null>;
}

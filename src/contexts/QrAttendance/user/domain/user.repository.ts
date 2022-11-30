import { UserEntity } from "./user.entity";

export interface UserRepository{
    findUserById(userId: string): Promise<UserEntity | null>;
    createUser(user: UserEntity): Promise<UserEntity | null>;
    findUserBy(query: any): Promise<UserEntity | null>;
    listUser(): Promise<UserEntity[] | null>;
}

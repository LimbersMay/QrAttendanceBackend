import {Either} from "../../../shared/types/ErrorEither";
import {UserError} from "./errors/userError";
import {UserEntity} from "./";
import {UserQuery} from "./user.query";

export interface UserRepository {
    findUserByEmail(email: string): Promise<Either<UserError, UserEntity>>;
    findUserById(userId: string): Promise<Either<UserError, UserEntity>>;
    createUser(user: UserEntity): Promise<Either<UserError, UserEntity>>;
    deleteUser(userId: string): Promise<Either<UserError, number>>;
    updateUser(fields: UserQuery, userId: string): Promise<Either<UserError, number>>;
}

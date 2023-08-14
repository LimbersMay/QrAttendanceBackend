import {Criteria, Either} from "../../shared";
import {UserEntity, UserQuery, UserError} from "./";

export interface UserRepository {
    findAll(criteria: Criteria): Promise<Either<UserError, UserEntity[]>>;
    findOne(criteria: Criteria): Promise<Either<UserError, UserEntity>>;
    createUser(user: UserEntity): Promise<Either<UserError, UserEntity>>;
    deleteUser(criteria: Criteria): Promise<Either<UserError, number>>;
    updateUser(fields: UserQuery, criteria: Criteria): Promise<Either<UserError, number>>;
}

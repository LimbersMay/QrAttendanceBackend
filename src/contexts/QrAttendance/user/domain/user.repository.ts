import {Criteria, Either} from "../../shared";
import {UserEntity, UserQuery, UserErrors} from "./";

export interface UserRepository {
    findAll(criteria: Criteria): Promise<Either<UserErrors, UserEntity[]>>;
    findOne(criteria: Criteria): Promise<Either<UserErrors, UserEntity>>;
    createUser(user: UserEntity): Promise<Either<UserErrors, UserEntity>>;
    deleteUser(criteria: Criteria): Promise<Either<UserErrors, number>>;
    updateUser(fields: UserQuery, criteria: Criteria): Promise<Either<UserErrors, number>>;
}

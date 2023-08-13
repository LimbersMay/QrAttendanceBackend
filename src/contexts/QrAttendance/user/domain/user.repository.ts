import {Criteria} from "../../../shared/specifications/specification";
import {Either} from "../../../shared/types/ErrorEither";
import {UserEntity, UserQuery, UserError} from "./";

export interface UserRepository {
    findAll(criteria: Criteria): Promise<Either<UserError, UserEntity[]>>;
    findOne(criteria: Criteria): Promise<Either<UserError, UserEntity>>;
    createUser(user: UserEntity): Promise<Either<UserError, UserEntity>>;
    deleteUser(criteria: Criteria): Promise<Either<UserError, number>>;
    updateUser(fields: UserQuery, criteria: Criteria): Promise<Either<UserError, number>>;
}

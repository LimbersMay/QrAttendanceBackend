import {UserRepository} from "../../domain";
import {UserResponse} from "../responses/user.response";
import {Either} from "../../../../shared/types/ErrorEither";
import {UserError} from "../../domain/errors/userError";
import {isRight, left, right} from "fp-ts/Either";

export class UserFinder {
    constructor(
        private readonly repository: UserRepository,
    ) {}

    execute = (id: string): Promise<Either<UserError, UserResponse>> => {
        return this.repository.findUserById(id).then((user) => {
            return isRight(user)
                ? right(UserResponse.fromUser(user.right))
                : left(UserError.USER_NOT_FOUND);

        }).catch(() => left(UserError.UNEXPECTED_ERROR));
    }

    executeByEmail = (email: string): Promise<Either<UserError, UserResponse>> => {
        return this.repository.findUserByEmail(email).then((user) => {
            return isRight(user)
                ? right(UserResponse.fromUser(user.right))
                : left(UserError.USER_NOT_FOUND);
        });
    }
}

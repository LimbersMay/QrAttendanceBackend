import {UserRepository} from "../../../domain";
import {UserResponse} from "../../responses/user.response";
import {Either} from "../../../../../shared/types/ErrorEither";
import {UserError} from "../../../domain/errors/userError";
import {isRight, left, right} from "fp-ts/Either";
import {inject, injectable} from "inversify";

import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/user/types";

@injectable()
export class UserFinder {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

    execute = (id: string): Promise<Either<UserError, UserResponse>> => {
        return this.userRepository.findUserById(id).then((user) => {
            return isRight(user)
                ? right(UserResponse.fromUser(user.right))
                : left(UserError.USER_NOT_FOUND);

        }).catch(() => left(UserError.USER_CANNOT_BE_FOUND));
    }

    executeByEmail = (email: string): Promise<Either<UserError, UserResponse>> => {
        return this.userRepository.findUserByEmail(email).then((user) => {
            return isRight(user)
                ? right(UserResponse.fromUser(user.right))
                : left(UserError.USER_NOT_FOUND);

        }).catch(() => left(UserError.USER_CANNOT_BE_FOUND));
    }
}

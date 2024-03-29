import {UserRepository} from "../../../domain";
import {UserQuery} from "../../../domain/user.query";
import {Either} from "../../../../../shared/types/ErrorEither";
import {UserError} from "../../../domain/errors/userError";
import {isRight, left, right} from "fp-ts/Either";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/user/types";

@injectable()
export class UserUpdater {

    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

   execute = (fields: UserQuery, userId: string): Promise<Either<UserError, number>> => {
        return this.userRepository.updateUser(fields, userId).then((result) => {
            return isRight(result)
                ? right(result.right)
                : left(UserError.USER_NOT_FOUND);

        }).catch(() => left(UserError.USER_CANNOT_BE_UPDATED));
    }
}

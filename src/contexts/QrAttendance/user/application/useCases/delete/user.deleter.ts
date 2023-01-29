import {inject, injectable} from "inversify";
import {isRight, left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/user/types";
import {UserRepository} from "../../../domain";
import {Either} from "../../../../../shared/types/ErrorEither";
import {UserError} from "../../../domain/errors/userError";

@injectable()
export class UserDeleter {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

    execute = (id: string): Promise<Either<UserError, number>> => {
        return this.userRepository.deleteUser(id).then((result) => {
            return isRight(result)
                ? right(result.right)
                : left(result.left);

        }).catch(() => left(UserError.USER_CANNOT_BE_DELETED))
    }
}

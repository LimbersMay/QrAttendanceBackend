import {UserRepository} from "../../domain";
import {Either} from "../../../../shared/types/ErrorEither";
import {UserError} from "../../domain/errors/userError";
import {isRight, left, right} from "fp-ts/Either";

export class UserDeleter {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    execute = (id: string): Promise<Either<UserError, number>> => {
        return this.userRepository.deleteUser(id).then((result) => {
            return isRight(result)
                ? right(result.right)
                : left(result.left);

        }).catch(() => left(UserError.USER_CANNOT_BE_DELETED))
    }
}

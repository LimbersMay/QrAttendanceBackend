import {inject, injectable} from "inversify";
import {isRight, left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/user/types";
import {Criteria, Either} from "../../../../shared";
import {UserRepository, UserError} from "../../../domain";

@injectable()
export class UserDeleter {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

    public async execute (criteria: Criteria): Promise<Either<UserError, number>> {
        try {
            const result = await this.userRepository.deleteUser(criteria);
            return isRight(result)
                ? right(result.right)
                : left(result.left);
        } catch {
            return left(UserError.USER_CANNOT_BE_DELETED);
        }
    }
}

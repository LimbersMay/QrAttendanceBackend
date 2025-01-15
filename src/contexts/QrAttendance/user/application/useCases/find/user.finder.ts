import {inject, injectable} from "inversify";
import {isRight, left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/user/types";
import {Either, Criteria} from "../../../../shared";
import {UserResponse} from "../../responses";
import {UserError, UserRepository} from "../../../domain";

@injectable()
export class UserFinder {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

    public async execute (specifications: Criteria): Promise<Either<UserError, UserResponse>> {
        try {
            const user = await this.userRepository.findOne(specifications);
            return isRight(user)
                ? right(UserResponse.fromUser(user.right))
                : left(UserError.USER_NOT_FOUND);
        } catch {
            return left(UserError.USER_CANNOT_BE_FOUND);
        }
    }
}

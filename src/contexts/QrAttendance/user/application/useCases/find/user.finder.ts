import {inject, injectable} from "inversify";
import {isRight, left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/user/types";
import {Either, Criteria} from "../../../../shared";
import {UserResponse} from "../../responses";
import {UserErrors, UserRepository} from "../../../domain";

@injectable()
export class UserFinder {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

    public async execute (specifications: Criteria): Promise<Either<UserErrors, UserResponse>> {
        try {
            const user = await this.userRepository.findOne(specifications);
            return isRight(user)
                ? right(UserResponse.fromUser(user.right))
                : left(UserErrors.USER_NOT_FOUND);
        } catch {
            return left(UserErrors.USER_CANNOT_BE_FOUND);
        }
    }
}

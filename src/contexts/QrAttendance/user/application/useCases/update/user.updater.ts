import {isRight, left, right} from "fp-ts/Either";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/user/types";
import {Criteria, Either} from "../../../../shared";
import {UserQuery, UserErrors, UserRepository} from "../../../domain";

@injectable()
export class UserUpdater {

    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

   execute = async (fields: UserQuery, criteria: Criteria): Promise<Either<UserErrors, number>> => {
       try {
           const result = await this.userRepository.updateUser(fields, criteria);
           return isRight(result)
               ? right(result.right)
               : left(UserErrors.USER_NOT_FOUND);
       } catch {
           return left(UserErrors.USER_CANNOT_BE_UPDATED);
       }
    }
}

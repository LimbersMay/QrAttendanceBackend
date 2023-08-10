import {isRight, left, right} from "fp-ts/Either";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/user/types";
import {Criteria} from "../../../../../shared/specifications/specification";
import {Either} from "../../../../../shared/types/ErrorEither";
import {UserQuery, UserError, UserRepository} from "../../../domain";

@injectable()
export class UserUpdater {

    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

   execute = async (fields: UserQuery, criteria: Criteria): Promise<Either<UserError, number>> => {
       try {
           const result = await this.userRepository.updateUser(fields, criteria);
           return isRight(result)
               ? right(result.right)
               : left(UserError.USER_NOT_FOUND);
       } catch {
           return left(UserError.USER_CANNOT_BE_UPDATED);
       }
    }
}

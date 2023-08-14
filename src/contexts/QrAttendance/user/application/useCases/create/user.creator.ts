import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/user/types";

import {isRight, left, right} from "fp-ts/Either";
import {UUIDGenerator, Either} from "../../../../shared";
import {UserRepository, UserValue, UserErrors} from "../../../domain";
import {UserResponse} from "../../responses";

@injectable()
export class UserCreator {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository,
        @inject(TYPES.UserUUIDGenerator) private UUIDGenerator: UUIDGenerator,

    ) {
    }

    execute = async ({name, email, lastname, password}: { name: string, email: string, lastname: string, password: string }): Promise<Either<UserErrors, UserResponse>> => {

        const user = UserValue.create({
            userId: this.UUIDGenerator.random(),
            email,
            password,
            name,
            lastname
        });

        return this.userRepository.createUser(user).then((user) => {
            return isRight(user)
                ? right(UserResponse.fromUser(user.right))
                : left(UserErrors.DUPLICATED_EMAIL);

        }).catch((err) => {
            console.log(err)
            return left(UserErrors.USER_CANNOT_BE_CREATED);
        });
    }
}


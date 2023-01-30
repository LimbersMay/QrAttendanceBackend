import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/user/types";

import {isRight, left, right} from "fp-ts/Either";
import {Either} from "../../../../../shared/types/ErrorEither";
import {UUIDGenerator} from "../../../../shared/application/services/UUIDGenerator";
import {PasswordHasher} from "../../../../shared/application/services/encrypt.service";
import {UserRepository, UserValue} from "../../../domain";
import {UserError} from "../../../domain/errors/userError";
import {UserResponse} from "../../responses/user.response";

@injectable()
export class UserCreator {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository,
        @inject(TYPES.UserUUIDGenerator) private UUIDGenerator: UUIDGenerator,
        @inject(TYPES.PasswordHasher) private passwordHasher: PasswordHasher,
    ) {
    }

    execute = async ({name, email, password, lastname}: { name: string, email: string, password: string, lastname: string }): Promise<Either<UserError, UserResponse>> => {

        const user = UserValue.create({
            userId: this.UUIDGenerator.random(),
            email,
            password: await this.passwordHasher.hash(password),
            name,
            lastname
        });

        return this.userRepository.createUser(user).then((user) => {
            return isRight(user)
                ? right(UserResponse.fromUser(user.right))
                : left(UserError.DUPLICATED_EMAIL);

        }).catch(() => left(UserError.USER_CANNOT_BE_CREATED));
    }
}


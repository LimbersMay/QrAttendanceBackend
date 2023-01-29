import {UserRepository, UserValue} from "../../../domain";
import {UUIDGenerator} from "../../../../shared/application/services/UUIDGenerator";
import {EncryptService} from "../../../../shared/application/services/encrypt.service";
import {Either} from "../../../../../shared/types/ErrorEither";
import {UserError} from "../../../domain/errors/userError";
import {isRight, left, right} from "fp-ts/Either";
import {UserResponse} from "../../responses/user.response";

export class UserCreator {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly UUIDGenerator: UUIDGenerator,
        private readonly passwordHasher: EncryptService,
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


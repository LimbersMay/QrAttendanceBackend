import {inject, injectable} from "inversify";
import {Either, isRight, left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../apps/QrAttendance/dependency-injection/user/types";
import {UUIDGenerator} from "../../../shared/application/services/UUIDGenerator";
import {PasswordHasher} from "../../../shared/application/services/encrypt.service";
import {UserResponse} from "../../../user/application";
import {UserError, UserRepository, UserValue} from "../../../user/domain";
import {CreateUserDTO} from "../validators/user.create";


@injectable()
export class UserRegistration {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository,
        @inject(TYPES.UserUUIDGenerator) private UUIDGenerator: UUIDGenerator,
        @inject(TYPES.PasswordHasher) private readonly encryptService: PasswordHasher
    ) {
    }

    public async execute ({ name, lastname, password, email }: CreateUserDTO): Promise<Either<UserError, UserResponse>> {

        const encryptedPassword = await this.encryptService.hash(password);

        const newUser = UserValue.create({
            userId: this.UUIDGenerator.random(),
            password: encryptedPassword,
            email,
            name,
            lastname
        });

        try {
            const result = await this.userRepository.createUser(newUser)

            if (isRight(result)) {
                return right(UserResponse.fromUser(result.right));
            }

            return left(UserError.DUPLICATED_EMAIL);

        } catch (error) {
            console.log(error);
            return left(UserError.USER_CANNOT_BE_CREATED);
        }
    }
}

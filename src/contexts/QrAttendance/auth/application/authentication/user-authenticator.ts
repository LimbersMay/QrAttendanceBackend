import {inject, injectable} from "inversify";
import {isLeft, left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../apps/QrAttendance/dependency-injection/user/types";
import {PasswordHasher, Either} from "../../../shared";
import {AuthError} from "../../domain";
import {UserResponse} from "../../../user/application";
import {UserRepository, UserEmailSpecification} from "../../../user/domain";

@injectable()
export class UserAuthenticator {
    constructor (
        @inject(TYPES.UserRepository) private readonly repository: UserRepository,
        @inject(TYPES.PasswordHasher) private readonly encryptService: PasswordHasher
    ){}

    public async execute(email: string, password: string): Promise<Either<AuthError, UserResponse>> {
        try {
            const user = await this.repository.findOne(new UserEmailSpecification(email));

            if (isLeft(user)) return left(AuthError.INVALID_CREDENTIALS);

            const isPasswordCorrect = await this.encryptService.compare(password, user.right.password);
            if (!isPasswordCorrect) return left(AuthError.INVALID_CREDENTIALS);

            return right(UserResponse.fromUser(user.right));

        } catch (error) {
            console.log(error);
            return left(AuthError.CANNOT_AUTHENTICATE_USER);
        }
    }
}

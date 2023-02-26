import {inject, injectable} from "inversify";
import {isLeft, left, right} from "fp-ts/Either";
import {UserRepository} from "../../../user/domain";
import {PasswordHasher} from "../../../shared/application/services/encrypt.service";
import {Either} from "../../../../shared/types/ErrorEither";
import {AuthError} from "../errors/authError";
import {UserResponse} from "../../../user/application/responses/user.response";
import {TYPES} from "../../../../../apps/QrAttendance/dependency-injection/user/types";

@injectable()
export class AuthenticateUser {
    constructor (
        @inject(TYPES.UserRepository) private repository: UserRepository,
        @inject(TYPES.PasswordHasher) private encryptService: PasswordHasher
    ){}

    execute(email: string, password: string): Promise<Either<AuthError, UserResponse>> {
        return this.repository.findUserByEmail(email).then(async (user) => {

            // check if user exists
            if (isLeft(user)) return left(AuthError.INVALID_CREDENTIALS);

            // check if password is correct
            const isPasswordCorrect = await this.encryptService.compare(password, user.right.password);
            if (!isPasswordCorrect) return left(AuthError.INVALID_CREDENTIALS);

            return right(UserResponse.fromUser(user.right));
        }).catch(() => left(AuthError.CANNOT_AUTHENTICATE_USER));
    }
}

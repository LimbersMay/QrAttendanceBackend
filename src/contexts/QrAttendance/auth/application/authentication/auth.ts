import {UserRepository} from "../../../user/domain";
import {EncryptService} from "../../../shared/application/services/encrypt.service";
import {Either} from "../../../../shared/types/ErrorEither";
import {AuthError} from "../errors/authError";
import {isLeft, left, right} from "fp-ts/Either";
import {UserResponse} from "../../../user/application/responses/user.response";

export class AuthenticateUser {
    constructor (
        private readonly repository: UserRepository,
        private readonly encryptService: EncryptService
    ){}

    execute(email: string, password: string): Promise<Either<AuthError, UserResponse>> {
        return this.repository.findUserByEmail(email).then((user) => {

            // check if user exists
            if (isLeft(user)) return left(AuthError.INVALID_CREDENTIALS);

            // check if password is correct
            const isPasswordCorrect = this.encryptService.compare(password, user.right.password);
            if (!isPasswordCorrect) return left(AuthError.INVALID_CREDENTIALS);

            return right(UserResponse.fromUser(user.right));
        }).catch(() => left(AuthError.CANNOT_AUTHENTICATE_USER));
    }
}

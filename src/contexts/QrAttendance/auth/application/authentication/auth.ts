import {inject, injectable} from "inversify";
import {isLeft, left, right} from "fp-ts/Either";
import {UserRepository} from "../../../user/domain";
import {PasswordHasher} from "../../../shared/application/services/encrypt.service";
import {Either} from "../../../../shared/types/ErrorEither";
import {AuthError} from "../errors/authError";
import {UserResponse} from "../../../user/application/responses/user.response";
import {TYPES} from "../../../../../apps/QrAttendance/dependency-injection/user/types";
import {JwtGenerator} from "../../infrastructure/helpers/jwt-generator";

interface AuthResponse {
    token: string;
    user: UserResponse;
}

@injectable()
export class UserAuthenticator {
    constructor (
        @inject(TYPES.UserRepository) private repository: UserRepository,
        @inject(TYPES.PasswordHasher) private encryptService: PasswordHasher,
        private jwtGenerator: JwtGenerator
    ){}

    execute(email: string, password: string): Promise<Either<AuthError, AuthResponse>> {
        return this.repository.findUserByEmail(email).then(async (user) => {

            // check if user exists
            if (isLeft(user)) return left(AuthError.INVALID_CREDENTIALS);

            // check if password is correct
            const isPasswordCorrect = await this.encryptService.compare(password, user.right.password);
            if (!isPasswordCorrect) return left(AuthError.INVALID_CREDENTIALS);

            const userResponse = UserResponse.fromUser(user.right);
            const token = this.jwtGenerator.generate(userResponse);

            return right({
                token,
                user: userResponse
            });
        }).catch(() => left(AuthError.CANNOT_AUTHENTICATE_USER));
    }
}

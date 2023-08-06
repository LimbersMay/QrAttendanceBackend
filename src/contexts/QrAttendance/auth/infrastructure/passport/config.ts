import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {inject, injectable} from "inversify";
import passport from "passport";
import {isLeft, isRight} from "fp-ts/Either";
import {UserAuthenticator} from "../../application/authentication/auth";
import {UserCreator, UserFinder} from "../../../user/application/useCases";
import {UserDTO} from "../../../user/application/entities/user.dto";
import {UserError} from "../../../user/domain/errors/userError";
import {AuthError} from "../../application/errors/authError";
import {API_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "../../../../utils/secrets";
import {TYPES} from "../../../../../apps/QrAttendance/dependency-injection/user/types";

import {PasswordHasher} from "../../../shared/application/services/encrypt.service";

declare global {
    namespace Express {
        interface User extends UserDTO {
        }
    }
}

@injectable()
// decouple passport using dependency injection
export class PassportLocalStrategy {
    constructor(
        private readonly userFinder: UserFinder,
        private readonly userCreator: UserCreator,
         @inject(TYPES.PasswordHasher) private passwordHasher: PasswordHasher,
    ) {
        this.googleStrategy();
    }

    // configure google strategy
    public googleStrategy() {
        passport.use(new GoogleStrategy({
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: `${API_URL}/auth/login-google-callback`,
                scope: ['profile', 'email'],
            },
            async (accessToken: string, refreshToken: string, profile, done) => {

                if (!profile.emails) return done(AuthError.CANNOT_AUTHENTICATE_USER, undefined);

                // check if user exists
                const user = await this.userFinder.executeByEmail(profile.emails[0].value);

                // if user does not exist
                if (isLeft(user)) {
                    // uncaught exception
                    if (user.left === UserError.USER_CANNOT_BE_FOUND) {
                        return done(user.left, undefined);
                    }
                }

                if (isRight(user)) {
                    return done(null, user.right);
                }

                const newUser = await this.userCreator.execute({
                    name: profile.displayName,
                    lastname: '',
                    password: '----',
                    email: profile.emails[0].value,
                });

                // uncaught exception
                if (isLeft(newUser)) {
                    return done(newUser.left, undefined);
                }

                // if everything goes well
                return done(null, newUser.right);
            }
        ));
    }

    public initialize() {
        return passport.initialize();
    }

    public session() {
        return passport.session();
    }
}

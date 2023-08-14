import {injectable} from "inversify";
import passport from "passport";
import {isLeft, isRight} from "fp-ts/Either";
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {AuthErrors} from "../../domain";
import {UserAuthenticator} from "../../application";

import {UserCreator, UserFinder, UserDTO} from "../../../user/application";
import {UserEmailSpecification, UserIdSpecification, UserErrors} from "../../../user/domain";
import {API_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "../../../../utils/secrets";

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
        private readonly userAuthenticator: UserAuthenticator,
        private readonly userFinder: UserFinder,
        private readonly userCreator: UserCreator,
    ) {
        this.localStrategy();
        this.googleStrategy();
    }

    // configure passport local strategy
    public localStrategy() {
        passport.use(
            new LocalStrategy(
                {
                    usernameField: 'email',
                    passwordField: 'password',
                },
                async (email, password, done) => {
                    // your logic here
                    const result = await this.userAuthenticator.execute(email, password);

                    return isRight(result)
                        ? done(null, result.right)
                        : done(result.left, false);

                },
            ),
        );

        // {id: 1, name: Juan}
        // 1 -> Serialization convert the current user to an identifier
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        // 1 -> {id: 1, name: Juan}. Deserialization convert the identifier to the current user
        passport.deserializeUser(async (id: string, done) => {

            const result = await this.userFinder.execute(new UserIdSpecification(id));

            return isRight(result)
                ? done(false, result.right)
                : done(result.left, false);
        });
    }

    public googleStrategy() {
        passport.use(new GoogleStrategy({
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: `${API_URL}/auth/login-google-callback`,
                scope: ['profile', 'email'],
            },
            async (accessToken: string, refreshToken: string, profile, done) => {

                if (!profile.emails) return done(AuthErrors.CANNOT_AUTHENTICATE_USER, undefined);

                // check if user exists
                const user = await this.userFinder.execute(
                    new UserEmailSpecification(profile.emails[0].value)
                );

                // if user does not exist
                if (isLeft(user)) {
                    // uncaught exception
                    if (user.left === UserErrors.USER_CANNOT_BE_FOUND) {
                        return done(user.left, undefined);
                    }
                }

                if (isRight(user)) {
                    return done(null, user.right);
                }

                if (!profile.emails)
                    return done(AuthErrors.CANNOT_AUTHENTICATE_USER, undefined);

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

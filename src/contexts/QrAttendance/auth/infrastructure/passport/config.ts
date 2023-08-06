import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt';
import {inject, injectable} from "inversify";
import passport from "passport";
import {isLeft, isRight} from "fp-ts/Either";
import {AuthenticateUser} from "../../application/authentication/auth";
import {UserCreator, UserFinder} from "../../../user/application/useCases";
import {UserDTO} from "../../../user/application/entities/user.dto";
import {UserError} from "../../../user/domain/errors/userError";
import {AuthError} from "../../application/errors/authError";
import {API_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET} from "../../../../utils/secrets";
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
        private readonly authenteicateUser: AuthenticateUser,
        private readonly userFinder: UserFinder,
        private readonly userCreator: UserCreator,
         @inject(TYPES.PasswordHasher) private passwordHasher: PasswordHasher,
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
                    const result = await this.authenteicateUser.execute(email, password);

                    return isRight(result)
                        ? done(null, result.right)
                        : done(result.left, false);

                },
            ),
        );

        // {id: 1, name: Juan}
        // 1 -> Serialización, pasar de un objeto a un dato muy particular
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        // 1 -> {id: 1, name: Juan}. Deserializacion Pasar del identificador al objeto
        passport.deserializeUser(async (id: string, done) => {

            const result = await this.userFinder.execute(id);

            return isRight(result)
                ? done(false, result.right)
                : done(result.left, false);
        });

        // JWT Implementation
        passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
            }, async (jwtPayload, done) => {
                const result = await this.userFinder.execute(jwtPayload.id);

                return isRight(result)
                    ? done(false, result.right)
                    : done(result.left, false);
            }
        ))
    }

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

                if (!profile.emails)
                    return done(AuthError.CANNOT_AUTHENTICATE_USER, undefined);

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

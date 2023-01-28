// import passport local strategy
import {Strategy as LocalStrategy} from 'passport-local';
import passport from "passport";
import {isRight} from "fp-ts/Either";
import {AuthenticateUser} from "../../application/authentication/auth";
import {UserDTO} from "../../../user/application/entities/user.dto";
import {UserFinder} from "../../../user/application/useCases";

declare global {
    namespace Express {
        interface User extends UserDTO {
        }
    }
}

// decouple passport using dependency injection
export class PassportLocalStrategy {
    constructor(
        private readonly authenteicateUser: AuthenticateUser,
        private readonly userFinder: UserFinder
    ) {

    }

    // configure passport local strategy
    public init() {
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
    }

    public initialize() {
        return passport.initialize();
    }

    public session() {
        return passport.session();
    }
}

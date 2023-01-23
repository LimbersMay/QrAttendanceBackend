// import passport local strategy
import {Strategy as LocalStrategy} from 'passport-local';
import passport from "passport";
import {EncryptService} from "../../../shared/application/services/encrypt.service";
import {UserEntity} from "../../../user/domain/user.entity";
import {AuthService} from "../../application/services/AuthService";
import {UserService} from "../../../user/application/user.service";

declare global {
    namespace Express {
        interface User extends UserEntity {
        }
    }
}

// decouple passport using dependency injection
export class PassportLocalStrategy implements AuthService{
    constructor(
        private readonly userService: UserService,
        private readonly hashService: EncryptService
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

                    const user = await this.userService.findUserByEmail(email);
                    if (!user) return done(null, false);

                    const isValidPassword = await this.hashService.compare(password, user.password);

                    if (!isValidPassword) return done(null, false);

                    return done(null, user);
                },
            ),
        );

        // {id: 1, name: Juan}
        // 1 -> Serialización, pasar de un objeto a un dato muy particular
        passport.serializeUser((user, done) => {
            done(null, user.userId);
        });

        // 1 -> {id: 1, name: Juan}. Deserializacion Pasar del identificador al objeto
        passport.deserializeUser(async (id: string, done) => {
            const user = await this.userService.findUserById(id);
            done(null, user);
        });
    }

    public initialize() {
        return passport.initialize();
    }

    public session() {
        return passport.session();
    }

    static authenticate(options?: any) {
        return passport.authenticate('local', {session: true});
    }
}

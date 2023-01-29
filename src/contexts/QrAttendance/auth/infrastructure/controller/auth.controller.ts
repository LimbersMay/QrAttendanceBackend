import {Request, Response} from "express";
import passport from "passport";
import {isRight} from "fp-ts/Either";
import {UserCreator} from "../../../user/application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {AuthError} from "../../application/errors/authError";

export class AuthController {
    constructor(
        private readonly userCreator: UserCreator
    ) {
    }

    public login = (req: Request, res: Response) => {
        passport.authenticate('local', (err, user) => {
            if (err) {
                return ResponseEntity
                    .status(400)
                    .body(err)
                    .send(res);
            }

            if (!user) {
                return ResponseEntity
                    .status(400)
                    .body(AuthError.INVALID_CREDENTIALS)
                    .send(res);
            }

            req.logIn(user, (err) => {
                if (err) {
                    return ResponseEntity
                        .status(400)
                        .body(err)
                        .send(res);
                }

                return res.status(200).json({
                    ok: true,
                    msg: "Login",
                    user: user
                });
            });

        })(req, res);
    }

    public register = async(req: Request, res: Response) => {

        let { name, email,  password, lastname } = req.body;

        const user = await this.userCreator.execute({ name, email, password, lastname });

        return isRight(user)
            ? this.login(req, res)
            : res.status(400).json({msg: user.left});

    }

    public logout = (req: Request, res: Response) => {
        req.logout((err) => {
            if (err) {
                return ResponseEntity
                    .status(400)
                    .body(err)
                    .send(res);
            }
        });

        return ResponseEntity
            .status(200)
            .body("logout")
            .send(res);
    }

    public isAuthenticated = (req: Request, res: Response) => {
        const isAuthenticated = req.isAuthenticated();

        if (!isAuthenticated) {
            return ResponseEntity
                .status(200)
                .body(AuthError.INVALID_CREDENTIALS)
                .send(res);
        }

        const user = req.user;

        return res.status(200).json({
            ok: true,
            msg: "Authenticated",
            user
        });
    }
}

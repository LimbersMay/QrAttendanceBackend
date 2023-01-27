import {UserMapperService} from "../../../user/infrastructure/mappers/user.mapper";
import {Request, Response} from "express";
import passport from "passport";
import {UserService} from "../../../user/application/user.service";
import {isRight} from "fp-ts/Either";

export class AuthController {
    constructor(
        private readonly userMapper: UserMapperService,
        private readonly userService: UserService
    ) {
    }

    public loginLocal = (req: Request, res: Response) => {

        passport.authenticate('local', (err, user) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: err
                });
            }

            if (!user) {
                return res.status(400).json({
                    ok: false,
                    msg: "Invalid credentials"
                });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        msg: "Error logging in"
                    });
                }

                const mappedUser = this.userMapper.toDTO(user);

                return res.status(200).json({
                    ok: true,
                    msg: "Login",
                    user: mappedUser
                });
            });

        })(req, res);
    }

    public registerLocal = async(req: Request, res: Response) => {

        let { name, email,  password, lastname } = req.body;

        const user = await this.userService.registerUser({ name, email, password, lastname });

        return isRight(user)
            ? this.loginLocal(req, res)
            : res.status(400).json({msg: user.left});

    }

    public logout = (req: Request, res: Response) => {
        req.logout((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: "Error logging out"
                });
            }
        });

        return res.status(200).json({
            ok: true,
            msg: "Logout"
        });
    }

    public isAuthenticated = (req: Request, res: Response) => {
        const isAuthenticated = req.isAuthenticated();

        if (!isAuthenticated) {
            return res.status(200).json({
                ok: false,
                msg: "Not authenticated"
            });
        }

        const user = req.user;

        return res.status(200).json({
            ok: true,
            msg: "Authenticated",
            user
        });
    }
}

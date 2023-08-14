import {Request, Response} from "express";
import {Body, Controller, Get, Post, Req, Res, UseBefore} from "routing-controllers";
import {injectable} from "inversify";
import {isRight} from "fp-ts/Either";
import {ResponseEntity, } from "../../../shared";
import {UserErrors} from "../../../user/domain";
import {Logout} from "../middlewares";
import {
    Authenticate,
    GoogleAuthentication,
    GoogleAuthenticationCallback
} from "../middlewares";
import {UserRegistration} from "../../application";
import {CreateUserDTO} from "../../application/validators/user.create";

@Controller('/auth')
@injectable()
export class AuthController {
    constructor(
        private readonly userRegistration: UserRegistration
    ) {
    }

    @Post('/login')
    @UseBefore(Authenticate)
    public login(@Req() req: Request) {

        return ResponseEntity
            .status(200)
            .body({ user: req.user })
            .buid()
    }

    @Get('/login-google')
    @UseBefore(GoogleAuthentication)
    public loginGoogle() {}

    @Get('/login-google-callback')
    @UseBefore(GoogleAuthenticationCallback)
    public loginGoogleCallback(@Req() req: Request, @Res() res: Response) {

    }

    @Post('/register')
    public async register(
        @Res() res: Response,
        @Body({ validate: true }) userDataDTO: CreateUserDTO
    ) {

        const result = await this.userRegistration.execute(userDataDTO);

        if (isRight(result)) return ResponseEntity
            .ok()
            .body({ user: result.right })
            .buid()

        switch (result.left) {
            case UserErrors.USER_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(result.left)
                    .send(res)

            default:
                return ResponseEntity
                    .status(500)
                    .body(result.left)
                    .send(res)
        }
    }

    @Post('/logout')
    @UseBefore(Logout)
    public logout() {
        return ResponseEntity
            .status(200)
            .body({ message: "Logout success"})
            .buid()
    }

    @Get('/authenticated')
    public isAuthenticated(@Req() req: Request) {

        if (!req.isAuthenticated()) return ResponseEntity
            .status(200)
            .body(null)
            .buid()


        return ResponseEntity
            .status(200)
            .body({ user: req.user })
            .buid()
    }
}

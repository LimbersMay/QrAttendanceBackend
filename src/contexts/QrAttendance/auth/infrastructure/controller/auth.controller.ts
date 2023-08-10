import {Request, Response} from "express";
import {inject, injectable} from "inversify";
import {Body, Controller, Get, Post, Req, Res, UseBefore} from "routing-controllers";
import {UserCreator} from "../../../user/application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {Logout} from "../middlewares";
import {
    Authenticate,
    GoogleAuthentication,
    GoogleAuthenticationCallback
} from "../middlewares";
import {isRight} from "fp-ts/Either";
import {UserError} from "../../../user/domain/errors/userError";
import {TYPES} from "../../../../../apps/QrAttendance/dependency-injection/user/types";
import {PasswordHasher} from "../../../shared/application/services/encrypt.service";

@Controller('/auth')
@injectable()
export class AuthController {
    constructor(
        private readonly userCreator: UserCreator,
        @inject(TYPES.PasswordHasher) private passwordHasher: PasswordHasher,
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
    public async register(@Body() {
        name,
        email,
        password,
        lastname
    }: { name: string, email: string, password: string, lastname: string }, @Res() res: Response) {

        const hashedPassword = await this.passwordHasher.hash(password);
        const result = await this.userCreator.execute({name, email, password: hashedPassword, lastname});

        if (isRight(result)) return ResponseEntity
            .ok()
            .body({ user: result.right })
            .buid()

        switch (result.left) {
            case UserError.USER_CANNOT_BE_CREATED:
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

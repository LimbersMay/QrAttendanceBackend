import {Request, Response} from "express";
import {inject, injectable} from "inversify";
import {Body, Controller, Get, HeaderParam, Post, Req, Res, UseBefore} from "routing-controllers";
import {UserCreator} from "../../../user/application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {EmailExists, Logout} from "../middlewares";
import {GoogleAuthentication, GoogleAuthenticationCallback} from "../middlewares";
import {isRight} from "fp-ts/Either";
import {UserError} from "../../../user/domain/errors/userError";
import {TYPES} from "../../../../../apps/QrAttendance/dependency-injection/user/types";
import {PasswordHasher} from "../../../shared/application/services/encrypt.service";
import {UserAuthenticator} from "../../application/authentication/auth";
import {AuthError} from "../../application/errors/authError";
import {JwtGenerator} from "../services/jwt-generator";

@Controller('/auth')
@injectable()
export class AuthController {
    constructor(
        private readonly userCreator: UserCreator,
        private readonly userAuthenticator: UserAuthenticator,
        private readonly JwtGenerator: JwtGenerator,
        @inject(TYPES.PasswordHasher) private passwordHasher: PasswordHasher,
    ) {}

    @Post('/login')
    public async login(@Body(){
        email,
        password
    }: {email: string, password: string}, @Res() res: Response) {

        const result = await this.userAuthenticator.execute(email, password);

        if (isRight(result)) return ResponseEntity
            .ok()
            .body(result.right)
            .buid()

        switch (result.left) {
            case AuthError.INVALID_CREDENTIALS:
                return ResponseEntity
                    .status(404)
                    .body(result.left)
                    .send(res)
            case AuthError.CANNOT_AUTHENTICATE_USER:
                return ResponseEntity
                    .status(500)
                    .body(result.left)
                    .send(res)
        }
    }

    @Get('/login-google')
    @UseBefore(GoogleAuthentication)
    public loginGoogle() {}

    @Get('/login-google-callback')
    @UseBefore(GoogleAuthenticationCallback)
    public loginGoogleCallback(@Req() req: Request, @Res() res: Response) {

    }

    @Post('/register')
    @UseBefore(EmailExists)
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
            .body('Logout success')
            .buid()
    }

    @Get('/authenticated')
    public async isAuthenticated(@HeaderParam('x-token') token: string, @Req() req: Request) {

        const user = await this.JwtGenerator.verify(token);

        return ResponseEntity
            .status(200)
            .body(user)
            .buid()
    }
}

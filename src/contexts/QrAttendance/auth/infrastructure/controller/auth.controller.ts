import {Request, Response} from "express";
import {injectable} from "inversify";
import {Body, Controller, Get, Post, Req, Res, UseAfter, UseBefore} from "routing-controllers";
import {UserCreator} from "../../../user/application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {EmailExists, Logout} from "../middlewares";
import {Authenticate, InvalidCredentialsHandler} from "../middlewares/providers.middleware";
import {isRight} from "fp-ts/Either";
import {UserError} from "../../../user/domain/errors/userError";

@Controller('/auth')
@injectable()
export class AuthController {
    constructor(
        private readonly userCreator: UserCreator
    ) {}

    @Post('/login')
    @UseBefore(Authenticate)
    @UseAfter(InvalidCredentialsHandler)
    public login (@Req() req: Request) {

        return ResponseEntity
            .status(200)
            .body(req.user)
            .buid()
    }

    @Post('/register')
    @UseBefore(EmailExists)
    public async register (@Body() { name, email, password, lastname}: { name: string, email: string, password: string, lastname: string}, @Res() res: Response) {
        const result = await this.userCreator.execute({ name, email, password, lastname });

        if (isRight(result)) return ResponseEntity
            .ok()
            .buid()

        switch (result.left) {
            case UserError.USER_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(result.left)
                    .buid()
        }
    }

    @Post('/logout')
    @UseBefore(Logout)
    public logout () {
        return ResponseEntity
            .status(200)
            .body('Logout success')
            .buid()
    }

    @Get('/authenticated')
    public isAuthenticated( @Req() req: Request) {

        if (!req.isAuthenticated()) return ResponseEntity
            .status(200)
            .body(null)
            .buid()


        return ResponseEntity
            .status(200)
            .body(req.user)
            .buid()
    }
}

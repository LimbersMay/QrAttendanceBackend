import {UserFinder, UserDeleter, UserUpdater } from "../../application/useCases";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {UserError} from "../../domain/errors/userError";
import {injectable} from "inversify";
import {Body, Delete, Get, JsonController, Put, QueryParam, Req, Res, UseBefore} from "routing-controllers";
import {IsAuthenticated} from "../../../auth/infrastructure/middlewares";

@JsonController('/user')
@injectable()
export class UserController {
    constructor(
        private readonly userFinder: UserFinder,
        private readonly userUpdater: UserUpdater,
        private readonly userDeleter: UserDeleter
    ) {}

    @Get('/')
    public async getUserById (@Res() res: Response, @QueryParam("userId", {required: true}) userId: string) {

        const user = await this.userFinder.execute(userId);

        if (isRight(user))
            return ResponseEntity
                .body(user.right)
                .buid();

        return this.handleError(user.left, res);
    }

    @Delete('/delete')
    @UseBefore(IsAuthenticated)
    public async delete (@Req() req: Request, @Res() res: Response) {

        // @ts-ignore
        const { id: userId } = req.user;
        const user = await this.userDeleter.execute(userId);

        if (isRight(user))
            return ResponseEntity
                .body(user.right)
                .buid();

        return this.handleError(user.left, res);
    }

    @Put('/update')
    @UseBefore(IsAuthenticated)
    public async update(@Req() req: Request, @Res() res: Response, @Body() {fields}: any) {

        // @ts-ignore
        const { id: userId = '' } = req.user;

        const expectedFields = {
            name: fields.name,
            lastname: fields.lastname,
            email: fields.email,
            password: fields.password
        }

        const user = await this.userUpdater.execute(expectedFields, userId);
        if (isRight(user))
            return ResponseEntity
                .body(user.right)
                .buid();

       return this.handleError(user.left, res);
    }

    private handleError (error: UserError, res: Response) {
        switch (error) {
            case UserError.USER_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(error)
                    .send(res);

            case UserError.USER_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);

                case UserError.USER_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);

                case UserError.USER_CANNOT_BE_UPDATED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);

                case UserError.USER_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);

            default:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);
        }
    }
}
import {UserFinder, UserDeleter, UserUpdater } from "../../application/useCases";
import {Request} from "express";
import {isRight} from "fp-ts/Either";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {UserError} from "../../domain/errors/userError";
import {injectable} from "inversify";
import {Body, Delete, Get, JsonController, Put, QueryParam, Req} from "routing-controllers";

@JsonController('/user')
@injectable()
export class UserController {
    constructor(
        private readonly userFinder: UserFinder,
        private readonly userUpdater: UserUpdater,
        private readonly userDeleter: UserDeleter
    ) {}

    @Get('/')
    public async getUserById (@QueryParam("userId", {required: true}) userId: string) {

        const user = await this.userFinder.execute(userId);

        if (isRight(user))
            return ResponseEntity
                .body(user.right)
                .buid();

        return this.handleError(user.left);
    }

    @Delete('/delete')
    public async delete (@Req() req: Request) {

        if (!req.user) return ResponseEntity.status(400).body('NOT_AUTHENTICATED').buildError();

        const { id: userId } = req.user;
        const user = await this.userDeleter.execute(userId);

        if (isRight(user))
            return ResponseEntity
                .body(user.right)
                .buid();

        return this.handleError(user.left);
    }

    @Put('/update')
    public async update(@Req() req: Request, @Body() {fields}: any) {

        if (!req.user) return ResponseEntity.status(400).body('NOT_AUTHENTICATED').buildError();

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

       return this.handleError(user.left);
    }

    private handleError (error: UserError) {
        switch (error) {
            case UserError.USER_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(error)
                    .buildError();

            case UserError.USER_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .buildError();

                case UserError.USER_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .buildError();

                case UserError.USER_CANNOT_BE_UPDATED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .buildError();

                case UserError.USER_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .buildError();

            default:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .buildError();
        }
    }
}
import {Response} from "express";
import {Body, JsonController, Put, Res, CurrentUser, UseBefore} from "routing-controllers";
import {isRight} from "fp-ts/Either";
import {injectable} from "inversify";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {UserResponse, UserUpdater} from "../../application";
import {UserIdSpecification, UserError} from "../../domain";
import {IsAuthenticated} from "../../../auth/infrastructure/middlewares";

@JsonController('/user')
@UseBefore(IsAuthenticated)
@injectable()
export class UserController {
    constructor(
        private readonly userUpdater: UserUpdater
    ) {}

    @Put('/')
    public async update(
        @Res() res: Response,
        @Body() fields: any,
        @CurrentUser() user: UserResponse
    ) {

        const expectedFields = {
            name: fields.name,
            lastname: fields.lastname,
            email: fields.email,
            password: fields.password
        }

        const result = await this.userUpdater.execute(
            expectedFields,
            new UserIdSpecification(user.id)
        );

        if (isRight(result))
            return ResponseEntity
                .ok()
                .body({ rowsUpdated: result.right })
                .buid();

       return this.handleError(result.left, res);
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
import {Response} from "express";
import {Body, JsonController, Put, Res, CurrentUser, UseBefore} from "routing-controllers";
import {isRight} from "fp-ts/Either";
import {injectable} from "inversify";
import {ResponseEntity} from "../../../shared";
import {IsAuthenticated} from "../../../auth";
import {UserResponse, UserUpdater} from "../../application";
import {UpdateUserDTO} from "../../application/validators/user.update";
import {UserIdSpecification, UserError} from "../../domain";

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
        @Body() fieldsToUpdate: UpdateUserDTO,
        @CurrentUser() user: UserResponse
    ) {

        const result = await this.userUpdater.execute(
            fieldsToUpdate,
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
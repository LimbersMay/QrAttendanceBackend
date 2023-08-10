import {Request, Response} from "express";
import {injectable} from "inversify";
import {isRight} from "fp-ts/Either";
import {GroupCreator, GroupDeleter, GroupFinder, GroupUpdater} from "../../application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {GroupError} from "../../application/errors/group.errors";
import {
    Body,
    BodyParam,
    CurrentUser,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseBefore
} from "routing-controllers";
import {IsAuthenticated} from "../../../auth/infrastructure/middlewares";
import {UserResponse} from "../../../user/application/responses/user.response";

@JsonController('/group')
@UseBefore(IsAuthenticated)
@injectable()
export class GroupController {
    constructor(
        private groupCreator: GroupCreator,
        private groupFinder: GroupFinder,
        private groupUpdater: GroupUpdater,
        private groupDeleter: GroupDeleter,
    ) {}

    @Get('/')
    public async findAll (
        @Req() req: Request,
        @Res() res: Response,
        @CurrentUser({required: true}) user: UserResponse
    ) {
        const groups = await this.groupFinder.executeByUserId(user.id);

        if (isRight(groups))
            return ResponseEntity
                .ok()
                .body(groups.right)
                .buid();

        return this.handleError(groups.left, res);
    }

    @Get('/:id')
    public async findOne (
        @Param("id") id: string,
        @Req() req: Request,
        @Res() res: Response,
        @CurrentUser({required: true}) user: UserResponse
    ) {

        const group = await this.groupFinder.execute(id, user.id);
        if (isRight(group))
            return ResponseEntity
                .ok()
                .body(group.right)
                .buid();

        return this.handleError(group.left, res);
    }

    @Post('/')
    public async create (
        @BodyParam("name") name: string,
        @Req() req: Request,
        @Res() res: Response,
        @CurrentUser({required: true}) user: UserResponse
    ) {

        const group = await this.groupCreator.execute(name, user.id);

        if (isRight(group))
            return ResponseEntity
                .ok()
                .body(group.right)
                .buid();

        return this.handleError(group.left, res);
    }

    @Put('/:id')
    public async update (
        @Req() req: Request,
        @Res() res: Response,
        @Param("id") id: string,
        @Body() updatedFields: any,
        @CurrentUser({required: true}) user: UserResponse
    ) {

        const expectedFields = {
            name: updatedFields.name
        }

        const result = await this.groupUpdater.execute(id, user.id, expectedFields);
        if (isRight(result))
            return ResponseEntity
                .ok()
                .body({ rowsUpdated: result.right })
                .buid();

        this.handleError(result.left, res);
    }

    @Delete('/:id')
    public async delete (
        @Param("id") id: string,
        @Req() req: Request,
        @Res() res: Response,
        @CurrentUser({required: true}) user: UserResponse
    ) {

        const group = await this.groupDeleter.execute(id, user.id);

        if (isRight(group))
            return ResponseEntity
                .ok()
                .body({ rowsDeleted: group.right })
                .buid();

        this.handleError(group.left, res);
    }

    private handleError = (result: GroupError, res: Response) => {
        switch (result) {
            case GroupError.GROUP_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(result)
                    .send(res)

            case GroupError.GROUP_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            case GroupError.GROUP_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            case GroupError.GROUP_CANNOT_BE_UPDATED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            case GroupError.GROUP_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            default:
                return ResponseEntity
                    .status(500)
                    .body("INTERNAL_SERVER_ERROR")
                    .send(res);
        }
    }
}

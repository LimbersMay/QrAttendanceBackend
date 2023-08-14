import {Response} from "express";
import {injectable} from "inversify";
import {isRight} from "fp-ts/Either";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {
    Body,
    CurrentUser,
    Delete,
    Get,
    JsonController,
    Params,
    Post,
    Put,
    Res,
    UseBefore
} from "routing-controllers";
import {GroupCreator, GroupDeleter, GroupFinder, GroupUpdater} from "../../application";
import {GroupError, GroupIdSpecification} from "../../domain";
import {IsAuthenticated} from "../../../auth/infrastructure";
import {UserResponse} from "../../../user/application";
import {UserIdSpecification} from "../../../user/domain";
import {CreateGroupDTO} from "../../application/validators/group.create";
import {UpdateGroupDTO} from "../../application/validators/group.update";
import {GroupIdDTO} from "../../application/validators/groupId";

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
        @Res() res: Response,
        @CurrentUser({required: true}) user: UserResponse
    ) {
        const groups = await this.groupFinder.findAll(
            new UserIdSpecification(user.id)
        );

        if (isRight(groups))
            return ResponseEntity
                .ok()
                .body(groups.right)
                .buid();

        return this.handleError(groups.left, res);
    }

    @Get('/:id')
    public async findOne (
        @Params() { id: groupId }: GroupIdDTO,
        @Res() res: Response,
        @CurrentUser({required: true}) user: UserResponse
    ) {

        const group = await this.groupFinder.findOne([
            new UserIdSpecification(user.id),
            new GroupIdSpecification(groupId)
        ]);

        if (isRight(group))
            return ResponseEntity
                .ok()
                .body(group.right)
                .buid();

        return this.handleError(group.left, res);
    }

    @Post('/')
    public async create (
        @Res() res: Response,
        @Body() groupDataDTO: CreateGroupDTO,
        @CurrentUser({required: true}) user: UserResponse
    ) {

        const group = await this.groupCreator.execute(groupDataDTO, user.id);

        if (isRight(group))
            return ResponseEntity
                .ok()
                .body(group.right)
                .buid();

        return this.handleError(group.left, res);
    }

    @Put('/:id')
    public async update (
        @Res() res: Response,
        @Params() { id: groupId }: GroupIdDTO,
        @Body() fieldsToUpdate: UpdateGroupDTO,
        @CurrentUser({required: true}) user: UserResponse
    ) {

        const result = await this.groupUpdater.execute(fieldsToUpdate, [
            new UserIdSpecification(user.id),
            new GroupIdSpecification(groupId)
        ]);

        if (isRight(result))
            return ResponseEntity
                .ok()
                .body({ rowsUpdated: result.right })
                .buid();

        this.handleError(result.left, res);
    }

    @Delete('/:id')
    public async delete (
        @Res() res: Response,
        @Params() { id: groupId }: GroupIdDTO,
        @CurrentUser({required: true}) user: UserResponse
    ) {

        const group = await this.groupDeleter.execute([
            new UserIdSpecification(user.id),
            new GroupIdSpecification(groupId)
        ]);

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

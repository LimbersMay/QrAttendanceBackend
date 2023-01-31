import {Request} from "express";
import {injectable} from "inversify";
import {isRight} from "fp-ts/Either";
import {GroupCreator, GroupDeleter, GroupFinder, GroupUpdater} from "../../application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {GroupError} from "../../application/errors/group.errors";
import {BodyParam, Delete, Get, JsonController, Param, Post, Put, Req, UseBefore} from "routing-controllers";
import {IsAuthenticated} from "../../../auth/infrastructure/middlewares";

@JsonController('/group')
@injectable()
export class GroupController {
    constructor(
        private groupCreator: GroupCreator,
        private groupFinder: GroupFinder,
        private groupUpdater: GroupUpdater,
        private groupDeleter: GroupDeleter,
    ) {}

    @Get('/:id([0-9]+)')
    @UseBefore(IsAuthenticated)
    public async getGroup (@Param("id") id: string, @Req() req: Request) {

        // @ts-ignore
        const { id: userId } = req.user;

        const group = await this.groupFinder.execute(id, userId);
        if (isRight(group))
            return ResponseEntity
                .ok()
                .body(group.right)
                .buid();

        return this.handleError(group.left);
    }

    @Get('/all')
    @UseBefore(IsAuthenticated)
    public async getGroups (@Req() req: Request) {

        // @ts-ignore
        const { id: userId } = req.user;

        const groups = await this.groupFinder.executeByUserId(userId);

        if (isRight(groups))
            return ResponseEntity
                .ok()
                .body(groups.right)
                .buid();

        return this.handleError(groups.left);
    }

    @Post('/create')
    @UseBefore(IsAuthenticated)
    public async create (@BodyParam("name") name: string, @Req() req: Request) {

        // @ts-ignore
        const { id: userId } = req.user;

        const group = await this.groupCreator.execute(name, userId);

        if (isRight(group))
            return ResponseEntity
                .ok()
                .body(group.right)
                .buid();

        return this.handleError(group.left);
    }

    @Put('/update')
    @UseBefore(IsAuthenticated)
    public async update (@Req() req: Request, @BodyParam("id") id: string, @BodyParam("updatedFields") updatedFields: any) {

        // @ts-ignore
        const { id: userId } = req.user;

        const expectedFields = {
            name: updatedFields.name
        }

        const result = await this.groupUpdater.execute(id, userId, expectedFields);
        if (isRight(result))
            return ResponseEntity
                .ok()
                .body(result.right)
                .buid();

        this.handleError(result.left);
    }

    @Delete('/delete/:id')
    @UseBefore(IsAuthenticated)
    public async delete (@Param("id") id: string, @Req() req: Request) {

        // @ts-ignore
        const { id: userId } = req.user;
        const group = await this.groupDeleter.execute(id, userId);

        if (isRight(group))
            return ResponseEntity
                .ok()
                .body(group.right)
                .buid();

        this.handleError(group.left);
    }

    private handleError = (result: GroupError) => {
        switch (result) {
            case GroupError.GROUP_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(result)
                    .buildError()

            case GroupError.GROUP_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .buildError();

            case GroupError.GROUP_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .buildError();

            case GroupError.GROUP_CANNOT_BE_UPDATED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .buildError();

            case GroupError.GROUP_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .buildError();

            default:
                return ResponseEntity
                    .status(500)
                    .body("INTERNAL_SERVER_ERROR")
                    .buildError();
        }
    }
}

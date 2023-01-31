import {Request, Response} from "express";
import {injectable} from "inversify";
import {isRight} from "fp-ts/Either";
import {GroupCreator, GroupDeleter, GroupFinder, GroupUpdater} from "../../application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {GroupError} from "../../application/errors/group.errors";
import {BodyParam, Delete, Get, JsonController, Param, Post, Put, Req, Res, UseBefore} from "routing-controllers";
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
    public async getGroup (@Param("id") id: string, @Req() req: Request, @Res() res: Response) {

        // @ts-ignore
        const { id: userId } = req.user;

        const group = await this.groupFinder.execute(id, userId);
        if (isRight(group))
            return ResponseEntity
                .ok()
                .body(group.right)
                .buid();

        return this.handleError(group.left, res);
    }

    @Get('/all')
    @UseBefore(IsAuthenticated)
    public async getGroups (@Req() req: Request, @Res() res: Response) {

        // @ts-ignore
        const { id: userId } = req.user;

        const groups = await this.groupFinder.executeByUserId(userId);

        if (isRight(groups))
            return ResponseEntity
                .ok()
                .body(groups.right)
                .buid();

        return this.handleError(groups.left, res);
    }

    @Post('/create')
    @UseBefore(IsAuthenticated)
    public async create (@BodyParam("name") name: string, @Req() req: Request, @Res() res: Response) {

        // @ts-ignore
        const { id: userId } = req.user;

        const group = await this.groupCreator.execute(name, userId);

        if (isRight(group))
            return ResponseEntity
                .ok()
                .body(group.right)
                .buid();

        return this.handleError(group.left, res);
    }

    @Put('/update')
    @UseBefore(IsAuthenticated)
    public async update (@Req() req: Request, @Res() res: Response, @BodyParam("id") id: string, @BodyParam("updatedFields") updatedFields: any) {

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

        this.handleError(result.left, res);
    }

    @Delete('/delete/:id')
    @UseBefore(IsAuthenticated)
    public async delete (@Param("id") id: string, @Req() req: Request, @Res() res: Response) {

        // @ts-ignore
        const { id: userId } = req.user;
        const group = await this.groupDeleter.execute(id, userId);

        if (isRight(group))
            return ResponseEntity
                .ok()
                .body(group.right)
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

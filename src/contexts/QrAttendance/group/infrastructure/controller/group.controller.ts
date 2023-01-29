import {GroupCreator, GroupDeleter, GroupFinder, GroupUpdater} from "../../application/useCases";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {GroupError} from "../../application/errors/group.errors";

export class GroupController {
    constructor(
        private groupCreator: GroupCreator,
        private groupFinder: GroupFinder,
        private groupUpdater: GroupUpdater,
        private groupDeleter: GroupDeleter,
    ) {}

    getGroup = async (req: Request, res: Response) => {
        if (!req.user) return res.json({msg: 'NOT AUTHENTICATED'});

        const { id: userId } = req.user;
        const { id } = req.body;

        const group = await this.groupFinder.execute(id, userId);
        if (isRight(group)) return ResponseEntity.ok().body(group.right).send(res);

        return this.handleError(group.left, res);
    }

    getGroups = async(req: Request, res: Response) => {
        if (!req.user) return res.json({msg: 'NOT AUTHENTICATED'});

        const { id: userId } = req.user;

        const groups = await this.groupFinder.executeByUserId(userId);
        if (isRight(groups)) return ResponseEntity.ok().body(groups.right).send(res);

        return this.handleError(groups.left, res);
    }

    create = async (req: Request, res: Response) => {
        if (!req.user) return res.json({msg: 'NOT AUTHENTICATED'});

        const { id: userId } = req.user;
        const { name } = req.body;

        const group = await this.groupCreator.execute(name, userId);

        if (isRight(group)) return ResponseEntity.ok().body(group.right).send(res);

        return this.handleError(group.left, res);
    }

    update = async(req: Request, res: Response) => {
        if (!req.user) return res.status(401).send({message: "NOT_AUTHORIZED"});

        const {id, updatedFields } = req.body;
        const { id: userId } = req.user;

        const expectedFields = {
            name: updatedFields.name
        }

        const result = await this.groupUpdater.execute(id, userId, expectedFields);
        if (isRight(result)) return ResponseEntity.ok().body(result.right).send(res);

        this.handleError(result.left, res);
    }

    public delete = async (req: Request, res: Response) => {

        if (!req.user) return res.json({msg: 'NOT AUTHENTICATED'});

        const { id: userId } = req.user;
        const { id } = req.body;

        const group = await this.groupDeleter.execute(id, userId);

        if (isRight(group)) return ResponseEntity.ok().body(group.right).send(res);

        this.handleError(group.left, res);
    }

    private handleError = (result: GroupError, res: Response) => {
        switch (result) {
            case GroupError.GROUP_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(result)
                    .send(res);

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

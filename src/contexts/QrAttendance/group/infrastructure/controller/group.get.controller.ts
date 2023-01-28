import {GroupFinder} from "../../application/useCases/find/group.finder";
import {Request, Response} from "express";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {isRight} from "fp-ts/Either";
import {GroupError} from "../../application/errors/group.errors";

export class GroupGetController {
    constructor(
        private readonly GroupFinder: GroupFinder
    ) {}

    getGroup = async (req: Request, res: Response) => {
        if (!req.user) return res.json({msg: 'NOT AUTHENTICATED'});

        const { id: userId } = req.user;
        const { id } = req.body;

        const group = await this.GroupFinder.execute(id, userId);
        if (isRight(group)) return ResponseEntity.ok().body(group.right).send(res);

        return this.validateResult(group.left, res);
    }

    getGroups = async(req: Request, res: Response) => {
        if (!req.user) return res.json({msg: 'NOT AUTHENTICATED'});

        const { id: userId } = req.user;

        const groups = await this.GroupFinder.executeByUserId(userId);
        if (isRight(groups)) return ResponseEntity.ok().body(groups.right).send(res);

        return this.validateResult(groups.left, res);
    }

    private validateResult = (result: GroupError, res: Response) => {
        switch (result) {
            case GroupError.GROUP_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(GroupError.GROUP_NOT_FOUND)
                    .send(res);

            case GroupError.GROUP_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(500)
                    .body(GroupError.GROUP_CANNOT_BE_FOUND)
                    .send(res);
        }
    }

}

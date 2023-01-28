import {GroupDeleter} from "../../application/useCases/delete/group.deleter";
import {Request, Response} from "express";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {isRight} from "fp-ts/Either";
import {GroupError} from "../../application/errors/group.errors";

export class GroupDeleteController {
    constructor(
        private readonly groupDeleter: GroupDeleter
    ) {}

    public delete = async (req: Request, res: Response) => {

        if (!req.user) return res.json({msg: 'NOT AUTHENTICATED'});

        const { id: userId } = req.user;
        const { id } = req.body;

        const group = await this.groupDeleter.execute(id, userId);

        if (isRight(group)) return ResponseEntity.ok().body(group.right).send(res);

        switch (group.left) {

            case GroupError.GROUP_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(GroupError.GROUP_NOT_FOUND)
                    .send(res);

            case GroupError.GROUP_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(GroupError.GROUP_CANNOT_BE_DELETED)
                    .send(res);
        }
    }
}

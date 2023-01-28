import {GroupCreator} from "../../application/useCases/create/group.creator";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {GroupError} from "../../application/errors/group.errors";

export class GroupCreateController {
    constructor(
        private readonly groupCreator: GroupCreator
    ) {}

    create = async (req: Request, res: Response) => {
        if (!req.user) return res.json({msg: 'NOT AUTHENTICATED'});

        const { id: userId } = req.user;
        const { name } = req.body;

        const group = await this.groupCreator.execute(name, userId);

        if (isRight(group)) return ResponseEntity.ok().body(group.right).send(res);

        switch (group.left) {
            case GroupError.GROUP_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(GroupError.GROUP_CANNOT_BE_CREATED)
                    .send(res);
        }

    }
}

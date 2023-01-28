import {GroupUpdater} from "../../application/useCases/update/group.updater";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {GroupError} from "../../application/errors/group.errors";

export class GroupUpdateController {
    constructor(
        private readonly groupUpdater: GroupUpdater
    ){}

    update = async(req: Request, res: Response) => {
        if (!req.user) return res.status(401).send({message: "NOT_AUTHORIZED"});

        const {id, updatedFields } = req.body;
        const { id: userId } = req.user;

        const expectedFields = {
            name: updatedFields.name
        }

        const result = await this.groupUpdater.execute(id, userId, expectedFields);
        if (isRight(result)) return ResponseEntity.ok().body(result.right).send(res);

        switch (result.left) {
            case GroupError.GROUP_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(GroupError.GROUP_NOT_FOUND)
                    .send(res);

            case GroupError.GROUP_CANNOT_BE_UPDATED:
                return ResponseEntity
                    .status(500)
                    .body(GroupError.GROUP_CANNOT_BE_UPDATED)
                    .send(res);
        }

    }
}

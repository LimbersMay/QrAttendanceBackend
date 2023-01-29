import {NextFunction, Request, Response} from "express";
import {isLeft} from "fp-ts/Either";
import {GroupFinder} from "../../application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";

export class GroupMiddleware {
    constructor(private readonly groupFinder: GroupFinder) {
    }

    validateGroupExists = async(req: Request, res: Response, next: NextFunction) => {

        if (!req.user) return ResponseEntity.status(401).body("NOT-AUTHENTICATED").send(res);

        const {id: idGroup} = req.body;
        const { id: userId } = req.user;
        const group = await this.groupFinder.execute(idGroup, userId);

        if (isLeft(group)) {
            return ResponseEntity
                .status(404)
                .body(group.left)
                .send(res);
        }

        next();
    }
}

import {NextFunction, Request, Response} from "express";
import {isLeft} from "fp-ts/Either";
import {GroupFinder} from "../../application/useCases";

export class GroupMiddleware {
    constructor(private readonly groupFinder: GroupFinder) {
    }

    validateGroupExists = async(req: Request, res: Response, next: NextFunction) => {

        if (!req.user) return res.status(401).json({msg: 'Unauthorized'});

        const {id: idGroup} = req.body;
        const { id: userId } = req.user;
        const group = await this.groupFinder.execute(idGroup, userId);

        if (isLeft(group)) {
            return res.status(404).json(
                {msg: group.left}
            );
        }

        next();
    }
}

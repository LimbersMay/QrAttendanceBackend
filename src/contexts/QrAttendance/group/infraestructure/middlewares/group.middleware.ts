import {GroupService} from "../../application/group.service";
import {NextFunction, Request, Response} from "express";
import {isLeft} from "fp-ts/Either";

export class GroupMiddleware {
    constructor(private readonly groupService: GroupService) {
    }

    validateGroupExists = async(req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params;
        const group = await this.groupService.getGroupById(id);

        if (isLeft(group)) {
            return res.status(404).json(
                {msg: group.left}
            );
        }

        next();
    }
}

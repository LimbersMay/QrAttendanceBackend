import {GroupService} from "../../application/group.service";
import {Request, Response} from "express";
import {isLeft} from "fp-ts/Either";

export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ) {
    }

    createGroup = async (req: Request, res: Response) => {
        const {name, userId} = req.body;

        const group = await this.groupService.createGroup(name, userId);

        if (isLeft(group)) {
            return res.status(400).json({
                ok: false,
                msg: group.left
            })
        }

        res.status(201).json({
            ok: true,
            group: group.right
        });
    }

    findGroupsByUserId  = async(req: Request, res: Response) => {
        const { userId } = req.params;

        const groups = await this.groupService.getGroupsByUserId(userId);

        if (isLeft(groups)) {
            return res.status(400).json({
                ok: false,
                msg: groups.left
            });
        }

        res.status(201).json({
            ok: false,
            groups: groups.right
        });
    }

    deleteGroup = async(req: Request, res: Response) => {

        const { id } = req.body;

        const group = await this.groupService.deleteGroup(id);

        if (isLeft(group)) {
            return res.status(400).json({
                ok: false,
                msg: group.left
            });
        }

        res.status(201).json({
            ok: false,
            group: group.right
        });
    }
}

import {GroupService} from "../../application/group.service";
import {Request, Response} from "express";
import {isLeft} from "fp-ts/Either";

export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ) {
    }

    createGroup = async (req: Request, res: Response) => {

        if (!req.user) return res.json();

        const { id } = req.user;
        const { name } = req.body;

        const group = await this.groupService.createGroup(name, id);

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

    getUserGroups  = async(req: Request, res: Response) => {

        if (!req.user) return res.json();

        const { id } = req.user;
        const groups = await this.groupService.getGroupsByUserId(id);

        if (isLeft(groups)) {
            return res.status(400).json({
                ok: false,
                msg: groups.left
            });
        }

        res.status(201).json({
            ok: true,
            groups: groups.right
        });
    }

    updateGroup = async(req: Request, res: Response) => {

        if (!req.user) return res.json();

        const { id: userId } = req.user;

        const { id: groupId, updatedFields } = req.body;
        const groupUpdated = await this.groupService.updateGroup(groupId, userId, updatedFields);

        if (isLeft(groupUpdated)) {
            return res.status(400).json({
                ok: false,
                msg: groupUpdated.left
            });
        }

        res.status(201).json({
            ok: true,
            group: groupUpdated.right
        })
    }

    deleteGroup = async(req: Request, res: Response) => {

        if (!req.user) return res.json();

        const { id: userId } = req.user;
        const { id } = req.body;

        const group = await this.groupService.deleteGroup(id, userId);

        if (isLeft(group)) {
            return res.status(400).json({
                ok: false,
                msg: group.left
            });
        }

        res.status(201).json({
            ok: true,
            group: group.right
        });
    }
}

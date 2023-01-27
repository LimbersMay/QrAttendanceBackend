import {GroupService} from "../../application/group.service";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";

export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ) {
    }

    createGroup = async (req: Request, res: Response) => {

        if (!req.user) return res.json();

        console.log('creating a group');

        const { id: userId } = req.user;
        const { name } = req.body;

        const group = await this.groupService.createGroup(name, userId);

        return isRight(group)
            ? this.sendGroupOrGroupsSucess(200, res, group.right)
            : this.sendFailure(400, res, group.left);
    }

    getUserGroups  = async(req: Request, res: Response) => {

        if (!req.user) return res.json({ERROR: 'NO USER'});

        const { id: userId } = req.user;
        const groups = await this.groupService.getGroupsByUserId(userId);

        return isRight(groups)
            ? this.sendGroupOrGroupsSucess(200, res, groups.right)
            : this.sendFailure(400, res, groups.left);
    }

    updateGroup = async(req: Request, res: Response) => {

        if (!req.user) return res.json();

        const { id: userId } = req.user;

        const { id: groupId, updatedFields } = req.body;
        const groupUpdated = await this.groupService.updateGroup(groupId, userId, updatedFields);

        return isRight(groupUpdated)
            ? this.sendGroupOrGroupsSucess(200, res, groupUpdated.right)
            : this.sendFailure(400, res, groupUpdated.left);
    }

    deleteGroup = async(req: Request, res: Response) => {

        if (!req.user) return res.json();

        const { id: userId } = req.user;
        const { id } = req.body;

        const group = await this.groupService.deleteGroup(id, userId);

        return isRight(group)
            ? this.sendGroupOrGroupsSucess(200, res, group.right)
            : this.sendFailure(400, res, group.left);
    }

    public sendGroupOrGroupsSucess = (status: number = 200, res: Response, groups: any) => {

        if (Array.isArray(groups)) {
            return res.status(status).json({
                groups
            });
        }

        return res.status(status).json({
            group: groups
        });
    }

    public sendFailure = (status: number = 400, res: Response, msg: string) => {
        return res.status(status).json({
            msg
        });
    }
}

import { Request, Response } from "express";
import { UserService } from '../../application/user.service';
import {isRight} from "fp-ts/Either";

export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    public getUserById = async({ query }: Request, res: Response) => {

        const { userId = '' } = query;

        const user = await this.userService.findUserById(`${userId}`);

        return isRight(user)
            ? this.sendSuccess(200, res, user.right)
            : this.sendFailure(400, res, user.left);
    }

    public updateUser = async(req: Request, res: Response) => {

        if (!req.user) return this.sendFailure(400, res, 'User not found');

        const { id: userId } = req.user;
        const {fields} = req.body;

        const user = await this.userService.updateUser(fields, userId);

        return isRight(user)
            ? this.sendSuccess(200, res, user.right)
            : this.sendFailure(400, res, user.left);
    }

    public deleteUser = async(req: Request, res: Response) => {

        if (!req.user) return this.sendFailure(400, res, 'User not found');

        const { id: userId } = req.user;
        const user = await this.userService.deleteUser(userId);

        return isRight(user)
            ? this.sendSuccess(200, res, user.right)
            : this.sendFailure(400, res, user.left);
    }

    public sendSuccess = (status: number = 200, res: Response, user: any) => {
        return res.status(status).json({
            user
        });
    }

    public sendFailure = (status: number = 400, res: Response, msg: string) => {
        return res.status(status).json({
            msg
        });
    }
}

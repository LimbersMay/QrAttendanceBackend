import { Request, Response } from "express";
import { UserService } from '../../application/user.service';
import {isLeft} from "fp-ts/Either";

export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    public getUserById = async({ query }: Request, res: Response) => {

        const { userId = '' } = query;

        const user = await this.userService.findUserById(`${userId}`);
        return res.status(200).json({
            user
        });
    }

    public createUser = async({ body }: Request, res: Response ) => {
        let { name, email,  password, lastname } = body;

        const user = await this.userService.registerUser({ name, email, password, lastname });

        if (isLeft(user)) {
            return res.status(400).json({
                ok: false,
                msg: user.left
            });
        }

        res.status(200);
        res.json({
            user: user.right
        });
    }

    public updateUser = async({body}: Request, res: Response) => {

        const {fields, userId} = body;

        const user = await this.userService.updateUser(fields, userId);
        res.status(200);
        res.json({
            user
        });
    }

    public deleteUser  = async({body}: Request, res: Response) => {

        const { userId } = body;

        const user = await this.userService.deleteUser(userId);
        res.status(200);
        res.json({
            user
        });
    }
}

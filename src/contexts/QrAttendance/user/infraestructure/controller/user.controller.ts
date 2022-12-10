import { Request, Response } from "express";
import { UserService } from '../../application/user.service';

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
        let { name, email,  password, mothersName, fathersName } = body;

        const user = await this.userService.registerUser({ name, email, password, mothersName, fathersName });
        res.status(200);
        res.json({
            user
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

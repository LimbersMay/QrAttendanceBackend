import { Request, Response } from "express";
import { UserService } from '../../application/user.service';

import {EncryptService} from "../../../shared/application/services/encrypt.service";
import {UuiService} from "../../../shared/application/services/uui.service";

export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    public getCtrl = async({ query }: Request, res: Response) => {

        const { userId = '' } = query;

        const user = await this.userService.findUserById(`${userId}`);
        return res.status(200).json({
            user
        });
    }

    public insertCtrl = async({ body }: Request, res: Response ) => {
        let { name, email,  password, mothersName, fathersName } = body;

        const user = await this.userService.registerUser({ name, email, password, mothersName, fathersName });
        res.status(200);
        res.json({
            user
        });
    }
}

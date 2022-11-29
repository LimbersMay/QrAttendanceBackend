import { Request, Response } from "express";
import { UserUseCase } from '../../application/userUseCase';

import {EncryptService} from "../../../shared/infraestructure/adapters/encrypt.service";
import {UuiService} from "../../../shared/infraestructure/adapters/uui.service";

export class UserController {
    constructor(
        private userUseCase: UserUseCase,
        private encryptService: EncryptService,
        private uuidService: UuiService
    ) {}

    public getCtrl = async({ query }: Request, res: Response) => {

        const { userId = '' } = query;

        const user = await this.userUseCase.findUserById(`${userId}`);
        return res.status(200).json({
            user
        });
    }

    public insertCtrl = async({ body }: Request, res: Response ) => {
        let { name, email,  password, mothersName, fathersName } = body;

        const userId = this.uuidService.random();
        password = await this.encryptService.hash(password);

        const user = await this.userUseCase.registerUser({ userId, name, email, password, mothersName, fathersName });
        res.status(200);
        res.json({
            user
        });
    }
}

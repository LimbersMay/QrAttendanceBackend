import { Request, Response } from "express";
import { UserUseCase } from '../../application/userUseCase';

export class UserController {
    constructor(private userUseCase: UserUseCase) {}

    public getCtrl = async({ query }: Request, res: Response) => {

        const { userId = '' } = query;

        const user = await this.userUseCase.findUserById(`${userId}`);
        return res.send({user});
    }

    public insertCtrl = async() => {

    }
}

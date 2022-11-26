import { Request, Response } from "express";
import { UserUseCase } from '../../application/userUseCase';

export class UserController {
    constructor(private userUseCase: UserUseCase) {}

    public getCtrl = async({ query }: Request, res: Response) => {

        const { userId = '' } = query;

        const user = await this.userUseCase.findUserById(`${userId}`);
        return res.status(200).json({
            user
        });
    }

    public insertCtrl = async({ body }: Request, res: Response ) => {
        const { name, email,  password, mothersName, fathersName } = body;

        const user = await this.userUseCase.registerUser({ name, email, password, mothersName, fathersName });
        return res.status(200).json({
            user
        });
    }
}

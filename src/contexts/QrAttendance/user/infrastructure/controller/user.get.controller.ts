import {UserFinder} from "../../application/useCases";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";

export class UserGetController {
    constructor(
        private userFinder: UserFinder
    ){}

    public getUserById = async({ query }: Request, res: Response) => {
        const { userId = '' } = query;
        const user = await this.userFinder.execute(`${userId}`);

        return isRight(user)
            ? res.status(200).json({ user: user.right })
            : res.status(400).json({ msg: user.left });
    }
}

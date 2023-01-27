import {UserDeleter} from "../../application/useCases";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";

export class UserDeleteController {
    constructor(
        private userDelete: UserDeleter,
    ) {}

    public delete = async(req: Request, res: Response) => {

        if (!req.user) return res.status(400).json({ msg: 'NOT_AUTHENTICATED' });

        const { id: userId } = req.user;
        const user = await this.userDelete.execute(userId);

        return isRight(user)
            ? res.status(200).json({ result: user.right })
            : res.status(400).json({ msg: user.left });
    }
}

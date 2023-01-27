import {UserUpdater} from "../../application/useCases/user.updater";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";

export class UserUpdateController {
    constructor(
        private userUpdate: UserUpdater,
    ) {}

    public update = async(req: Request, res: Response) => {

            if (!req.user) return res.status(400).json({ msg: 'NOT_AUTHENTICATED' });

            const { id: userId } = req.user;
            const {fields} = req.body;

            const expectedFields = {
                name: fields.name,
                lastname: fields.lastname,
                email: fields.email,
                password: fields.password
            }

            const user = await this.userUpdate.execute(expectedFields, userId);

            return isRight(user)
                ? res.status(200).json({ result: user.right })
                : res.status(400).json({ msg: user.left });
    }
}

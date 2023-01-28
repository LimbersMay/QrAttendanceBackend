import {UserUpdater} from "../../application/useCases/user.updater";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {UserError} from "../../domain/errors/userError";

export class UserUpdateController {
    constructor(
        private userUpdate: UserUpdater,
    ) {}

    public update = async(req: Request, res: Response) => {

            if (!req.user) return res.status(400).json({ msg: 'NOT_AUTHENTICATED' });

            const { id: userId = '' } = req.user;
            const {fields} = req.body;

            const expectedFields = {
                name: fields.name,
                lastname: fields.lastname,
                email: fields.email,
                password: fields.password
            }

            const user = await this.userUpdate.execute(expectedFields, userId);
            if (isRight(user)) return ResponseEntity.ok().body(user.right).send(res);

            switch (user.left) {
                case UserError.USER_NOT_FOUND:
                    return ResponseEntity
                        .status(400)
                        .body(user.left)
                        .send(res);

                case UserError.USER_CANNOT_BE_UPDATED:
                    return ResponseEntity
                        .status(500)
                        .body(user.left)
                        .send(res);

                default:
                    return ResponseEntity
                        .status(500)
                        .body('INTERNAL_SERVER_ERROR')
                        .send(res);
            }
    }
}

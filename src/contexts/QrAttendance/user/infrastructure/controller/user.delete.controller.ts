import {UserDeleter} from "../../application/useCases";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {UserError} from "../../domain/errors/userError";

export class UserDeleteController {
    constructor(
        private userDelete: UserDeleter,
    ) {}

    public delete = async(req: Request, res: Response) => {

        if (!req.user) return res.status(400).json({ msg: 'NOT_AUTHENTICATED' });

        const { id: userId } = req.user;
        const user = await this.userDelete.execute(userId);

        if (isRight(user)) return ResponseEntity.ok().body(user.right).send(res);

        switch (user.left) {
            case UserError.USER_NOT_FOUND:
                return ResponseEntity
                    .status(400)
                    .body(user.left)
                    .send(res);

            case UserError.USER_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(user.left)
                    .send(res);

            default:
                return ResponseEntity
                    .status(500)
                    .body('SERVER_INTERNAL_ERROR')
                    .send(res);
        }
    }
}

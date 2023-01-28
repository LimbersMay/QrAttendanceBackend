import {UserFinder} from "../../application/useCases";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";
import {UserError} from "../../domain/errors/userError";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";

export class UserGetController {
    constructor(
        private userFinder: UserFinder
    ) {
    }

    public getUserById = async ({query}: Request, res: Response) => {
        const {userId = ''} = query;

        const user = await this.userFinder.execute(`${userId}`);

        if (isRight(user)) return ResponseEntity.ok().body(user.right).send(res);

        switch (user.left) {
            case UserError.USER_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(user.left)
                    .send(res);

            case UserError.USER_CANNOT_BE_FOUND:
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

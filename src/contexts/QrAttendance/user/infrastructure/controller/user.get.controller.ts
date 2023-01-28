import {UserFinder} from "../../application/useCases";
import {Request, Response} from "express";
import {fold} from "fp-ts/Either";
import {UserError} from "../../domain/errors/userError";
import {UserResponse} from "../../application/responses/user.response";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";

export class UserGetController {
    constructor(
        private userFinder: UserFinder
    ) {
    }

    public getUserById = async ({query}: Request, res: Response) => {
        const {userId = ''} = query;

        return this.userFinder.execute(`${userId}`).then(user => {
            return fold(
                (error: UserError) => {
                    switch (error) {
                        case UserError.USER_NOT_FOUND:
                            return ResponseEntity
                                .status(404)
                                .body({msg: error})
                                .send(res);

                        default:
                            return ResponseEntity
                                .status(500)
                                .body({error: 'Internal server error'})
                                .send(res);
                    }
                },
                (user: UserResponse) => ResponseEntity
                    .ok()
                    .body(user)
                    .send(res)
            )(user);
        })
    }
}

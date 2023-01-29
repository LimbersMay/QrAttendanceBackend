import {UserFinder, UserDeleter, UserUpdater } from "../../application/useCases";
import {Request, Response} from "express";
import {isRight} from "fp-ts/Either";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {UserError} from "../../domain/errors/userError";
import {injectable} from "inversify";

@injectable()
export class UserController {
    constructor(
        private readonly userFinder: UserFinder,
        private readonly userUpdater: UserUpdater,
        private readonly userDeleter: UserDeleter
    ) {}

    public getUserById = async ({query}: Request, res: Response) => {
        const {userId = ''} = query;

        const user = await this.userFinder.execute(`${userId}`);

        if (isRight(user)) return ResponseEntity.ok().body(user.right).send(res);

        return this.handleError(res, user.left);
    }

    public delete = async(req: Request, res: Response) => {

        if (!req.user) return res.status(400).json({ msg: 'NOT_AUTHENTICATED' });

        const { id: userId } = req.user;
        const user = await this.userDeleter.execute(userId);

        if (isRight(user)) return ResponseEntity.ok().body(user.right).send(res);

        return this.handleError(res, user.left);
    }

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

        const user = await this.userUpdater.execute(expectedFields, userId);
        if (isRight(user)) return ResponseEntity.ok().body(user.right).send(res);

       return this.handleError(res, user.left);
    }

    private handleError = (res: Response, error: UserError) => {
        switch (error) {
            case UserError.USER_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(error)
                    .send(res);

            case UserError.USER_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);

                case UserError.USER_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);

                case UserError.USER_CANNOT_BE_UPDATED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);

                case UserError.USER_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);
            default:
                return ResponseEntity
                    .status(500)
                    .body('INTERNAL_SERVER_ERROR')
                    .send(res);
        }
    }
}
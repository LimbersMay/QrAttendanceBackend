import { Request, Response, NextFunction } from "express";
import {injectable} from "inversify";
import {isRight} from "fp-ts/Either";
import {AuthError} from "../../application/errors/authError";
import {UserFinder} from "../../../user/application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {ExpressMiddlewareInterface, UnauthorizedError, BadRequestError} from "routing-controllers";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({
        ok: false,
        msg: AuthError.NOT_AUTHENTICATED
    })
}

@injectable()
export class AuthMiddleware {

    constructor(
        private readonly userFinder: UserFinder
    ) {
    }

    public emailExists = async (req: Request, res: Response, next: NextFunction) => {

        const {email} = req.body;
        const exists = await this.userFinder.executeByEmail(email);

        return isRight(exists)
            ? ResponseEntity.status(400).body(AuthError.DUPLICATED_EMAIL).send(res)
            : next();
    }
}

@injectable()
export class EmailExists implements ExpressMiddlewareInterface {
    constructor(
         private userFinder: UserFinder
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        const {email} = req.body;
        const exists = await this.userFinder.executeByEmail(email);

        return isRight(exists)
            ? ResponseEntity.status(400).body(AuthError.DUPLICATED_EMAIL).send(res)
            : next();
    }
}

@injectable()
export class IsAuthenticated implements ExpressMiddlewareInterface {
    use(request: Request, response: Response, next: NextFunction) {
        if (request.isAuthenticated()) return next()
        return next(new UnauthorizedError(AuthError.NOT_AUTHENTICATED));
    }
}

@injectable()
export class Logout implements ExpressMiddlewareInterface {
    use (req: Request, res: Response, next: NextFunction){
        req.logout((err) => {
            if (err) {
                return new BadRequestError(err);
            }
        });

        return next();
    }
}

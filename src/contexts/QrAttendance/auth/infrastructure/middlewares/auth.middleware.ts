import { Request, Response, NextFunction } from "express";
import {injectable} from "inversify";
import {isRight} from "fp-ts/Either";
import {AuthError} from "../../application/errors/authError";
import {UserFinder} from "../../../user/application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {ExpressMiddlewareInterface, BadRequestError} from "routing-controllers";
import {JwtGenerator} from "../services/jwt-generator";

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

    public constructor(
        private readonly jwtGenerator: JwtGenerator
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {

        const jwtAuth = req.headers["x-token"];

        if (!jwtAuth) {
            return next({
                status: 401,
                message: AuthError.NO_TOKEN_IN_HEADERS
            });
        }

        try {
            await this.jwtGenerator.verify(`${jwtAuth}`);
            return next();
        } catch (e) {
            return next({
                status: 401,
                message: AuthError.INVALID_SESSION
            });
        }
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

import { Request, Response, NextFunction } from "express";
import {ExpressMiddlewareInterface, UnauthorizedError, BadRequestError} from "routing-controllers";
import {injectable} from "inversify";
import {AuthError} from "../../application/errors/authError";

@injectable()
export class IsAuthenticated implements ExpressMiddlewareInterface {
    use(request: Request, response: Response, next: NextFunction) {
        if (request.isAuthenticated()) return next();
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

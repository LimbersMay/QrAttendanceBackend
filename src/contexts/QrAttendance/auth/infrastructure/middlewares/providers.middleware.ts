import {NextFunction, Request, Response} from "express";
import passport, {Authenticator} from "passport";
import {
    ExpressErrorMiddlewareInterface,
    ExpressMiddlewareInterface,
    Middleware,
    UnauthorizedError
} from "routing-controllers";
import {injectable} from "inversify";
import {AuthError} from "../../application/errors/authError";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";

@injectable()
export class Authenticate implements ExpressMiddlewareInterface {
    public authenticate (callback: any) {
        return passport.authenticate('local', { session: true }, callback);
    }

    public use(req: Request, res: Response, next: NextFunction): Promise<Authenticator> {

        return this.authenticate((err: any , user: any) => {

            if (err || !user) {
                return next(new UnauthorizedError(AuthError.INVALID_CREDENTIALS));
            }

            req.login(user, (err) => {
                if (err) {
                    return next(new UnauthorizedError(AuthError.INVALID_CREDENTIALS));
                }

                return next();
            })

        })(req, res, next);
    }
}

@Middleware({ type: "after" })
@injectable()
export class InvalidCredentialsHandler implements ExpressErrorMiddlewareInterface {
    error (err: any, req: Request, res: Response, next: NextFunction) {
        return ResponseEntity
            .status(401)
            .body(err)
            .send(res);
    }
}

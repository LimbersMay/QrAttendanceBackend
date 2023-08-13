import {NextFunction, Request, Response} from "express";
import passport, {Authenticator} from "passport";
import {
    ExpressMiddlewareInterface,
    UnauthorizedError
} from "routing-controllers";
import {injectable} from "inversify";
import {AuthErrors} from "../../domain";
import {CLIENT_URL} from "../../../../utils/secrets";

@injectable()
export class Authenticate implements ExpressMiddlewareInterface {
    public authenticate (callback: any) {
        return passport.authenticate('local', { session: true }, callback);
    }

    public use(req: Request, res: Response, next: NextFunction): Promise<Authenticator> {

        return this.authenticate((err: any , user: any) => {

            if (err || !user) {
                return next(new UnauthorizedError(AuthErrors.INVALID_CREDENTIALS));
            }

            req.login(user, (err) => {
                if (err) {
                    return next(new UnauthorizedError(AuthErrors.INVALID_CREDENTIALS));
                }

                return next();
            })

        })(req, res, next);
    }
}

@injectable()
export class GoogleAuthentication implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction){
        return passport.authenticate('google')(req, res, next);
    }
}

@injectable()
export class GoogleAuthenticationCallback implements ExpressMiddlewareInterface {

    authenticate (callback: any) {
        return passport.authenticate('google', { session: true }, callback);
    }

    use(req: Request, res: Response, next: NextFunction){
        return this.authenticate((err: any , user: any) => {

            if (err || !user) {
                return next(new UnauthorizedError(err));
            }

            req.login(user, (err) => {
                if (err) {
                    return next(new UnauthorizedError(AuthErrors.INVALID_CREDENTIALS));
                }

                return res.redirect(CLIENT_URL);
            });

            req.user = user;
        })(req, res, next);
    }
}

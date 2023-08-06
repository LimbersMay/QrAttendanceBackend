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
import {CLIENT_URL} from "../../../../utils/secrets";
import {generateToken} from "../helpers/jwt-generator";

@injectable()
export class Authenticate implements ExpressMiddlewareInterface {
    public authenticate (callback: any) {
        return passport.authenticate('local', { session: false }, callback);
    }

    public use(req: Request, res: Response, next: NextFunction): Promise<Authenticator> {

        // NOTE: We can use JWT because in this middleware, then the user is authenticated, we generate a JWT token
        // And passport will know that the user is authenticated because we are using JWT strategy

        return this.authenticate((err: any, user: any) => {

            if (err || !user) {
                return next(new UnauthorizedError(AuthError.INVALID_CREDENTIALS));
            }

            req.login(user, {session: false},(err) => {
                if (err) {
                    return next(new UnauthorizedError(AuthError.INVALID_CREDENTIALS));
                }

                // generate a signed son web token with the contents of user object and return it in the response
                const token = generateToken(user)
                return ResponseEntity
                    .status(200)
                    .body({
                        user,
                        token
                    })
                    .send(res);

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
                    return next(new UnauthorizedError(AuthError.INVALID_CREDENTIALS));
                }

                return res.redirect(CLIENT_URL);
            });

            req.user = user;
        })(req, res, next);
    }
}

@Middleware({ type: "after" })
@injectable()
export class InvalidCredentialsHandler implements ExpressErrorMiddlewareInterface {
    error (err: any, req: Request, res: Response, next: NextFunction) {
        return ResponseEntity
            .status(401)
            .body(err.message)
            .send(res);
    }
}

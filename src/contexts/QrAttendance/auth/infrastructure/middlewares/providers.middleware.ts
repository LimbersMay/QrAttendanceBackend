import {NextFunction, Request, Response} from "express";
import passport from "passport";
import {
    ExpressErrorMiddlewareInterface,
    ExpressMiddlewareInterface,
    Middleware,
    UnauthorizedError
} from "routing-controllers";
import {injectable} from "inversify";
import {AuthError} from "../../application/errors/authError";
import {CLIENT_URL} from "../../../../utils/secrets";
import {JwtGenerator} from "../services/jwt-generator";
import {ValidationError} from "class-validator";

interface HttpErrorHandler {
    status: number;
    message: string;
}

@injectable()
export class GoogleAuthentication implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction){
        return passport.authenticate('google')(req, res, next);
    }
}

@injectable()
export class GoogleAuthenticationCallback implements ExpressMiddlewareInterface {

    constructor(
        private readonly jwtGenerator: JwtGenerator
    ) {}

    authenticate (callback: any) {
        return passport.authenticate('google', { session: false }, callback);
    }

    use(req: Request, res: Response, next: NextFunction){
        return this.authenticate((err: any , user: any) => {

            if (err || !user) {
                console.log(err);
                return next(new UnauthorizedError(err));
            }

            req.login(user, {session: false},(err) => {
                if (err) {
                    console.log(err)
                    return next(new UnauthorizedError(AuthError.INVALID_CREDENTIALS));
                }

                const token = this.jwtGenerator.generate(user);
                return res.redirect(301, `${CLIENT_URL}/auth?token=${token}`);
            });
        })(req, res, next);
    }
}

@injectable()
@Middleware({ type: "after" })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: HttpErrorHandler | any, request: Request, response: Response, next: NextFunction) {

        if (error.errors) {

            if (!Array.isArray(error.errors)) {
                console.log(error.errors);
                return {
                    errors: error.errors
                };
            }

            // class-validator error
            const errors = error.errors.map((err: ValidationError) => {
                return {
                    field: err.property,
                    constraints: err.constraints
                }
            });

            response.status(400);
            response.json({
                message: error.message,
                errors
            });

        } else {
            // generic error handler
            console.log(error);
            response.status(error.status || 500);
            response.json({
                error: error.message,
            });
        }

        return next();
    }
}

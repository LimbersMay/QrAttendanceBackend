import {NextFunction, Request, Response} from "express";
import {ExpressErrorMiddlewareInterface, Middleware, UnauthorizedError} from "routing-controllers";
import {ValidationError} from "class-validator";
import {injectable} from "inversify";

export interface HttpErrorHandler {
    status: number;
    message: string;
}

@injectable()
@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: HttpErrorHandler | any, _request: Request, response: Response, next: NextFunction) {

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
            console.log('Error: ', error);

            if (error instanceof UnauthorizedError) {
                response.status(401);
                return response.json({
                    body: error.message,
                });
            }

            response.status(error.status || 500);
            response.json({
                body: error.message,
            });
        }

        return next();
    }
}
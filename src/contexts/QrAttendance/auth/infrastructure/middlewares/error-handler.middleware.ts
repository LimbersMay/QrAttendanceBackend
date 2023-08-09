import {NextFunction, Request, Response} from "express";
import {ExpressErrorMiddlewareInterface, Middleware} from "routing-controllers";
import {ValidationError} from "class-validator";
import {injectable} from "inversify";

export interface HttpErrorHandler {
    status: number;
    message: string;
}

@injectable()
@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
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
            console.log('Error: ', error);
            response.status(error.status || 500);
            response.json({
                error: error.message,
            });
        }

        return next();
    }
}
import { Request, Response, NextFunction } from "express";
import {AuthError} from "../../application/errors/authError";
import {isRight} from "fp-ts/Either";
import {UserFinder} from "../../../user/application/find/user.find";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({
        ok: false,
        msg: AuthError.NOT_AUTHENTICATED
    })
}

export class AuthMiddleware {

    constructor(
        private readonly userFinder: UserFinder
    ) {
    }
    public emailExists = async (req: Request, res: Response, next: NextFunction) => {

        const { email } = req.body;
        const exists = await this.userFinder.executeByEmail(email);

        return isRight(exists)
            ? res.status(400).json({msg: AuthError.DUPLICATED_EMAIL})
            : next();
    }
}

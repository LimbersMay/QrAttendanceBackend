import { Request, Response, NextFunction } from "express";
import {AuthErrors} from "../../application/errors/auth.errors";
import {isRight} from "fp-ts/Either";
import {UserService} from "../../../user/application/user.service";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({
        ok: false,
        msg: AuthErrors.NOT_AUTHENTICATED
    })
}

export class AuthMiddleware {

    constructor(
        private readonly userService: UserService
    ) {
    }
    public emailExists = async (req: Request, res: Response, next: NextFunction) => {

        const { email } = req.body;
        const exists = await this.userService.findUserByEmail(email);

        return isRight(exists)
            ? res.status(400).json({msg: AuthErrors.DUPLICATED_EMAIL})
            : next();
    }
}

import { Request, Response, NextFunction } from "express";
import {AuthErrors} from "../../application/errors/auth.errors";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({
        ok: false,
        msg: AuthErrors.NOT_AUTHENTICATED
    })
}

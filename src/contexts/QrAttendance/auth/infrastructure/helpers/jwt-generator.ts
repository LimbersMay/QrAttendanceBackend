import {sign, verify} from "jsonwebtoken";
import {JWT_SECRET} from "../../../../utils/secrets";
import {UserResponse} from "../../../user/application/responses/user.response";

interface MyJwtPayload {
    user: UserResponse;
    iat: number;
    exp: number;
}

export const generateToken = (user: UserResponse): string => {
    return sign({ user }, JWT_SECRET, {
        expiresIn: '2d'
    });
}

export const verifyToken = (token: string): Promise<UserResponse> => {
    return new Promise((resolve, reject) => {
        verify(token, JWT_SECRET, (err, payload) => {
            if (err) {
                return reject(err);
            }

            if (!payload) {
                return reject(new Error('No payload'));
            }

            const myPayload = payload as MyJwtPayload;
            return resolve(myPayload.user);
        });
    });
}

import {sign, verify} from "jsonwebtoken";
import {JWT_SECRET} from "../../../../utils/secrets";
import {UserResponse} from "../../../user/application/responses/user.response";
import {injectable} from "inversify";

interface MyJwtPayload {
    user: UserResponse;
    iat: number;
    exp: number;
}

@injectable()
export class JwtGenerator {
    public generate(user: UserResponse): string {
        return sign({ user }, JWT_SECRET, {
            expiresIn: '2d'
        });
    }

    public verify(token: string): Promise<UserResponse> {
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
}

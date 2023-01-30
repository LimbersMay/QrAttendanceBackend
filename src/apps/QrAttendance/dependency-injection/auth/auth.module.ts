import {Container} from "inversify";
import {AuthController} from "../../../../contexts/QrAttendance/auth/infrastructure/controller/auth.controller";
import {AuthMiddleware} from "../../../../contexts/QrAttendance/auth/infrastructure/middlewares";
import {PassportLocalStrategy} from "../../../../contexts/QrAttendance/auth/infrastructure/passport/config";
import {AuthenticateUser} from "../../../../contexts/QrAttendance/auth/application/authentication/auth";

export const authModule = (container: Container) => {
    container.bind<AuthController>(AuthController).toSelf();
    container.bind<AuthMiddleware>(AuthMiddleware).toSelf();

    container.bind<PassportLocalStrategy>(PassportLocalStrategy).toSelf();
    container.bind<AuthenticateUser>(AuthenticateUser).toSelf();
}

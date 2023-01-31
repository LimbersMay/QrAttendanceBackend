import {Container} from "inversify";
import {AuthController} from "../../../../contexts/QrAttendance/auth/infrastructure/controller/auth.controller";
import {
    AuthMiddleware, EmailExists,
    IsAuthenticated,
    Logout
} from "../../../../contexts/QrAttendance/auth/infrastructure/middlewares";
import {PassportLocalStrategy} from "../../../../contexts/QrAttendance/auth/infrastructure/passport/config";
import {AuthenticateUser} from "../../../../contexts/QrAttendance/auth/application/authentication/auth";
import {
    Authenticate,
    InvalidCredentialsHandler
} from "../../../../contexts/QrAttendance/auth/infrastructure/middlewares/providers.middleware";

export const authModule = (container: Container) => {

    // middlewares
    container.bind<InvalidCredentialsHandler>(InvalidCredentialsHandler).toSelf();
    container.bind<IsAuthenticated>(IsAuthenticated).toSelf();
    container.bind<EmailExists>(EmailExists).toSelf();
    container.bind<Logout>(Logout).toSelf();

    // middlewares error handlers

    // auth providers
    container.bind<Authenticate>(Authenticate).toSelf();

    container.bind<AuthController>(AuthController).toSelf();
    container.bind<AuthMiddleware>(AuthMiddleware).toSelf();

    container.bind<PassportLocalStrategy>(PassportLocalStrategy).toSelf();
    container.bind<AuthenticateUser>(AuthenticateUser).toSelf();
}

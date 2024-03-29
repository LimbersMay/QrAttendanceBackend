import {Container} from "inversify";
import {AuthController} from "../../../../contexts/QrAttendance/auth/infrastructure/controller/auth.controller";
import {
    EmailExists,
    IsAuthenticated,
    Logout
} from "../../../../contexts/QrAttendance/auth/infrastructure/middlewares";
import {PassportLocalStrategy} from "../../../../contexts/QrAttendance/auth/infrastructure/passport/config";
import {AuthenticateUser} from "../../../../contexts/QrAttendance/auth/application/authentication/auth";
import {
    Authenticate, GoogleAuthentication, GoogleAuthenticationCallback,
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
    container.bind<GoogleAuthentication>(GoogleAuthentication).toSelf()
    container.bind<GoogleAuthenticationCallback>(GoogleAuthenticationCallback).toSelf();

    container.bind<AuthController>(AuthController).toSelf();
    container.bind<PassportLocalStrategy>(PassportLocalStrategy).toSelf();

    // use cases
    container.bind<AuthenticateUser>(AuthenticateUser).toSelf();
}

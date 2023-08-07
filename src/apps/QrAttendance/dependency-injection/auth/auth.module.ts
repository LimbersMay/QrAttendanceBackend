import {Container} from "inversify";
import {AuthController} from "../../../../contexts/QrAttendance/auth/infrastructure/controller/auth.controller";
import {
    EmailExists,
    IsAuthenticated,
    Logout
} from "../../../../contexts/QrAttendance/auth/infrastructure/middlewares";
import {PassportLocalStrategy} from "../../../../contexts/QrAttendance/auth/infrastructure/passport/config";
import {UserAuthenticator} from "../../../../contexts/QrAttendance/auth/application/authentication/user-authenticator";
import {
    Authenticate, GoogleAuthentication, GoogleAuthenticationCallback,
    ErrorHandlerMiddleware
} from "../../../../contexts/QrAttendance/auth/infrastructure/middlewares";

export const authModule = (container: Container) => {

    // middlewares
    container.bind<IsAuthenticated>(IsAuthenticated).toSelf();
    container.bind<EmailExists>(EmailExists).toSelf();
    container.bind<Logout>(Logout).toSelf();

    // middlewares error handlers
    container.bind<ErrorHandlerMiddleware>(ErrorHandlerMiddleware).toSelf();

    // auth providers
    container.bind<Authenticate>(Authenticate).toSelf();
    container.bind<GoogleAuthentication>(GoogleAuthentication).toSelf()
    container.bind<GoogleAuthenticationCallback>(GoogleAuthenticationCallback).toSelf();

    container.bind<AuthController>(AuthController).toSelf();
    container.bind<PassportLocalStrategy>(PassportLocalStrategy).toSelf();

    // use cases
    container.bind<UserAuthenticator>(UserAuthenticator).toSelf();
}

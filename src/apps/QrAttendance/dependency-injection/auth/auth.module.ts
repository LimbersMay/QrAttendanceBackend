import {Container} from "inversify";
import {AuthController} from "../../../../contexts/QrAttendance/auth/infrastructure/controller/auth.controller";
import {
    EmailExists,
    IsAuthenticated,
    Logout
} from "../../../../contexts/QrAttendance/auth/infrastructure/middlewares";
import {PassportLocalStrategy} from "../../../../contexts/QrAttendance/auth/infrastructure/passport/config";
import {UserAuthenticator} from "../../../../contexts/QrAttendance/auth/application/authentication/auth";
import {
    GoogleAuthentication, GoogleAuthenticationCallback,
    InvalidCredentialsHandler
} from "../../../../contexts/QrAttendance/auth/infrastructure/middlewares";
import {JwtGenerator} from "../../../../contexts/QrAttendance/auth/infrastructure/helpers/jwt-generator";

export const authModule = (container: Container) => {

    // middlewares
    container.bind<InvalidCredentialsHandler>(InvalidCredentialsHandler).toSelf();
    container.bind<IsAuthenticated>(IsAuthenticated).toSelf();
    container.bind<EmailExists>(EmailExists).toSelf();
    container.bind<Logout>(Logout).toSelf();

    // middlewares error handlers

    // auth providers
    container.bind<GoogleAuthentication>(GoogleAuthentication).toSelf()
    container.bind<GoogleAuthenticationCallback>(GoogleAuthenticationCallback).toSelf();

    container.bind<AuthController>(AuthController).toSelf();
    container.bind<PassportLocalStrategy>(PassportLocalStrategy).toSelf();

    // use cases
    container.bind<UserAuthenticator>(UserAuthenticator).toSelf();

    // helpers
    container.bind<JwtGenerator>(JwtGenerator).toSelf();
}

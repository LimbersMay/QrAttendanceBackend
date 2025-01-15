import {Container} from "inversify";
import {
    AuthController,
    Authenticate,
    ErrorHandlerMiddleware,
    GoogleAuthentication, GoogleAuthenticationCallback,
    IsAuthenticated, Logout, PassportLocalStrategy, UserAuthenticator, UserRegistration
} from "../../../../contexts/QrAttendance/auth";

export const authModule = (container: Container) => {

    // middlewares
    container.bind<IsAuthenticated>(IsAuthenticated).toSelf();
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
    container.bind<UserRegistration>(UserRegistration).toSelf();
}

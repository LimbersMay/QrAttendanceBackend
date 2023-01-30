import {Container} from "inversify";
import { userModule } from "./user/user.module";
import {UserController} from "../../../contexts/QrAttendance/user/infrastructure/controller";
import {groupModule} from "./group/group.module";
import {GroupController} from "../../../contexts/QrAttendance/group/infrastructure/controller/group.controller";
import {qrCodeModule} from "./qrCode/qrCode.module";
import {QrCodeController} from "../../../contexts/QrAttendance/qr_code/infrastructure/controllers";
import {registryModule} from "./registry/registry.module";
import {
    RegistryController
} from "../../../contexts/QrAttendance/registry/infrastructure/controller/registry.controller";
import {authModule} from "./auth/auth.module";
import {AuthController} from "../../../contexts/QrAttendance/auth/infrastructure/controller/auth.controller";
import {AuthMiddleware} from "../../../contexts/QrAttendance/auth/infrastructure/middlewares";
import {PassportLocalStrategy} from "../../../contexts/QrAttendance/auth/infrastructure/passport/config";

const container = new Container();

authModule(container);
userModule(container);
groupModule(container);
qrCodeModule(container);
registryModule(container);

const AuthControllerInjected = container.get<AuthController>(AuthController);
const AuthMiddlewareInjected = container.get<AuthMiddleware>(AuthMiddleware);
const AuthPassportStrategyInjected = container.get<PassportLocalStrategy>(PassportLocalStrategy);
const UserControllerInjected = container.get<UserController>(UserController);
const GroupControllerInjected = container.get<GroupController>(GroupController);
const QrCodeControllerInjected = container.get<QrCodeController>(QrCodeController);

const RegistryControllerInjected = container.get<RegistryController>(RegistryController);

export {
    UserControllerInjected,
    GroupControllerInjected,
    QrCodeControllerInjected,
    RegistryControllerInjected,
    AuthControllerInjected,
    AuthMiddlewareInjected,
    AuthPassportStrategyInjected
};

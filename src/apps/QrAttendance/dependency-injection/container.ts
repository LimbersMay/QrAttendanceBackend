import {Container} from "inversify";
import { userModule } from "./user/user.module";
import {groupModule} from "./group/group.module";
import {qrCodeModule} from "./qrCode/qrCode.module";
import {registryModule} from "./registry/registry.module";
import {authModule} from "./auth/auth.module";
import {PassportLocalStrategy} from "../../../contexts/QrAttendance/auth";
import {
    RegistrySocketController
} from "../../../contexts/QrAttendance/registry";
import {sharedModule} from "./shared-module";

const container = new Container();

sharedModule(container);

authModule(container);
userModule(container);
groupModule(container);
qrCodeModule(container);
registryModule(container);

const AuthPassportStrategyInjected = container.get<PassportLocalStrategy>(PassportLocalStrategy);
const RegistrySocketControllerInjected = container.get<RegistrySocketController>(RegistrySocketController);

export {
    container,
    RegistrySocketControllerInjected,
    AuthPassportStrategyInjected
};

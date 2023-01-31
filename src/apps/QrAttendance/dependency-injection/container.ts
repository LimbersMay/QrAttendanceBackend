import {Container} from "inversify";
import { userModule } from "./user/user.module";
import {groupModule} from "./group/group.module";
import {qrCodeModule} from "./qrCode/qrCode.module";
import {registryModule} from "./registry/registry.module";
import {authModule} from "./auth/auth.module";
import {PassportLocalStrategy} from "../../../contexts/QrAttendance/auth/infrastructure/passport/config";

const container = new Container();

authModule(container);
userModule(container);
groupModule(container);
qrCodeModule(container);
registryModule(container);

const AuthPassportStrategyInjected = container.get<PassportLocalStrategy>(PassportLocalStrategy);

export {
    container,
    AuthPassportStrategyInjected
};

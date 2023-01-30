import {Container} from "inversify";
import { userModule } from "./user/user.module";
import {UserController} from "../../../contexts/QrAttendance/user/infrastructure/controller";
import {groupModule} from "./group/group.module";
import {GroupController} from "../../../contexts/QrAttendance/group/infrastructure/controller/group.controller";
import {qrCodeModule} from "./qrCode/qrCode.module";
import {QrCodeController} from "../../../contexts/QrAttendance/qr_code/infrastructure/controllers";

const container = new Container();

userModule(container);
groupModule(container);
qrCodeModule(container);

const UserControllerInjected = container.get<UserController>(UserController);
const GroupControllerInjected = container.get<GroupController>(GroupController);
const QrCodeControllerInjected = container.get<QrCodeController>(QrCodeController);

export { UserControllerInjected, GroupControllerInjected, QrCodeControllerInjected };

import {Container} from "inversify";
import { userModule } from "./user/user.module";
import {UserController} from "../../../contexts/QrAttendance/user/infrastructure/controller";
import {groupModule} from "./group/group.module";
import {GroupController} from "../../../contexts/QrAttendance/group/infrastructure/controller/group.controller";

const container = new Container();

userModule(container);
groupModule(container);

const UserControllerInjected = container.get<UserController>(UserController);
    const GroupControllerInjected = container.get<GroupController>(GroupController);

export { UserControllerInjected, GroupControllerInjected };

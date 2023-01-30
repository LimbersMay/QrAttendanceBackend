import {Container} from "inversify";
import { userModule } from "./user/user.module";
import {UserController} from "../../../contexts/QrAttendance/user/infrastructure/controller";

const container = new Container();

userModule(container);

const UserControllerInjected = container.get<UserController>(UserController);

export { UserControllerInjected };

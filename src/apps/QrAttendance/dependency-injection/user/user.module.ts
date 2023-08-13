import {Container} from "inversify";
import {TYPES} from "./types";

import {UserRepository} from "../../../../contexts/QrAttendance/user/domain";
import { UUIDGenerator } from "../../../../contexts/QrAttendance/shared/application/services/UUIDGenerator";
import { PasswordHasher } from "../../../../contexts/QrAttendance/shared/application/services/encrypt.service";
import {UserMysqlRepository} from "../../../../contexts/QrAttendance/user/infrastructure/repository/user.repository";
import {BcryptAdapter, UuidAdapter} from "../../../../contexts/QrAttendance/user/infrastructure/adapters";
import {
    UserCreator,
    UserDeleter,
    UserFinder,
    UserUpdater
} from "../../../../contexts/QrAttendance/user/application";
import {UserController} from "../../../../contexts/QrAttendance/user/infrastructure/controller";

export const userModule = (container: Container) => {
    container.bind<UserController>(UserController).toSelf();

    container.bind<UserCreator>(UserCreator).toSelf();
    container.bind<UserUpdater>(UserUpdater).toSelf();
    container.bind<UserDeleter>(UserDeleter).toSelf();
    container.bind<UserFinder>(UserFinder).toSelf();

    container.bind<UserRepository>(TYPES.UserRepository).to(UserMysqlRepository);
    container.bind<UUIDGenerator>(TYPES.UserUUIDGenerator).to(UuidAdapter);
    container.bind<PasswordHasher>(TYPES.PasswordHasher).to(BcryptAdapter);
}

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
} from "../../../../contexts/QrAttendance/user/application/useCases";
import {UserController} from "../../../../contexts/QrAttendance/user/infrastructure/controller";

export const userModule = (container: Container) => {
    container.bind(UserController).toSelf();

    container.bind(UserCreator).toSelf();
    container.bind(UserUpdater).toSelf();
    container.bind(UserDeleter).toSelf();
    container.bind(UserFinder).toSelf();

    container.bind<UserRepository>(TYPES.UserRepository).to(UserMysqlRepository);
    container.bind<UUIDGenerator>(TYPES.UUIDGenerator).to(UuidAdapter);
    container.bind<PasswordHasher>(TYPES.PasswordHasher).to(BcryptAdapter);
}

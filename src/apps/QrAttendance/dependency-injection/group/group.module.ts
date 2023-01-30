import {Container} from "inversify";
import {GroupController} from "../../../../contexts/QrAttendance/group/infrastructure/controller/group.controller";
import {
    GroupCreator,
    GroupDeleter,
    GroupFinder,
    GroupUpdater
} from "../../../../contexts/QrAttendance/group/application/useCases";
import {GroupRepository} from "../../../../contexts/QrAttendance/group/domain/group.repository";
import {UUIDGenerator} from "../../../../contexts/QrAttendance/shared/application/services/UUIDGenerator";
import {TYPES} from "./types";

import {GroupMysqlRepository} from "../../../../contexts/QrAttendance/group/infrastructure/repository";
import {UuidAdapter} from "../../../../contexts/QrAttendance/group/infrastructure/adapters";

export const groupModule = (container: Container) => {
    container.bind<GroupController>(GroupController).toSelf();

    container.bind<GroupCreator>(GroupCreator).toSelf();
    container.bind<GroupUpdater>(GroupUpdater).toSelf();
    container.bind<GroupDeleter>(GroupDeleter).toSelf();
    container.bind<GroupFinder>(GroupFinder).toSelf();

    container.bind<GroupRepository>(TYPES.GroupRepository).to(GroupMysqlRepository);
    container.bind<UUIDGenerator>(TYPES.GroupUUIDGenerator).to(UuidAdapter);
}

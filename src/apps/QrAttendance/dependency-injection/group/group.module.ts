import {Container} from "inversify";
import {UUIDGenerator} from "../../../../contexts/QrAttendance/shared";
import {TYPES} from "./types";
import {
    GroupController,
    GroupCreator,
    GroupDeleter,
    GroupFinder, GroupMysqlRepository, GroupRepository,
    GroupUpdater, UuidAdapter
} from "../../../../contexts/QrAttendance/group";


export const groupModule = (container: Container) => {
    container.bind<GroupController>(GroupController).toSelf();

    // use cases
    container.bind<GroupCreator>(GroupCreator).toSelf();
    container.bind<GroupUpdater>(GroupUpdater).toSelf();
    container.bind<GroupDeleter>(GroupDeleter).toSelf();
    container.bind<GroupFinder>(GroupFinder).toSelf();

    container.bind<GroupRepository>(TYPES.GroupRepository).to(GroupMysqlRepository);
    container.bind<UUIDGenerator>(TYPES.GroupUUIDGenerator).to(UuidAdapter);
}

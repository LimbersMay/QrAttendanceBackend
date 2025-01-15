import {Container} from "inversify";
import {TYPES} from "./types";
import {
    RegistryController,
    RegistryCreator, RegistryDeleter, RegistryFinder, RegistryMysqlRepository, RegistryRepository,
    RegistrySocketController, RegistryUpdater, UuidAdapter
} from "../../../../contexts/QrAttendance/registry";

import {UUIDGenerator} from "../../../../contexts/QrAttendance/shared";

export const registryModule = (container: Container) => {
    container.bind<RegistryController>(RegistryController).toSelf();

    // websockets
    container.bind<RegistrySocketController>(RegistrySocketController).toSelf();

    // use cases
    container.bind<RegistryCreator>(RegistryCreator).toSelf();
    container.bind<RegistryFinder>(RegistryFinder).toSelf();
    container.bind<RegistryUpdater>(RegistryUpdater).toSelf();
    container.bind<RegistryDeleter>(RegistryDeleter).toSelf();

    container.bind<RegistryRepository>(TYPES.RegistryRepository).to(RegistryMysqlRepository);
    container.bind<UUIDGenerator>(TYPES.RegistryUUIDGenerator).to(UuidAdapter);
}

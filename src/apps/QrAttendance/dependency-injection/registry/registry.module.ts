import {Container} from "inversify";
import {RegistryCreator, RegistryFinder, RegistryUpdater, RegistryDeleter} from "../../../../contexts/QrAttendance/registry/application/useCases";
import {RegistryRepository} from "../../../../contexts/QrAttendance/registry/domain/registry.repository";
import {TYPES} from "./types";
import {UuidAdapter} from "../../../../contexts/QrAttendance/registry/infrastructure/adapters";
import {
    RegistryMysqlRepository
} from "../../../../contexts/QrAttendance/registry/infrastructure/repository/registry.repository";
import {
    RegistryController
} from "../../../../contexts/QrAttendance/registry/infrastructure/controller/registry.controller";
import {
    RegistrySocketController
} from "../../../../contexts/QrAttendance/registry/infrastructure/sockets/Registrysocket.controller";

export const registryModule = (container: Container) => {
    container.bind<RegistryController>(RegistryController).toSelf();

    // websockets
    container.bind<RegistrySocketController>(RegistrySocketController).toSelf();

    container.bind<RegistryCreator>(RegistryCreator).toSelf();
    container.bind<RegistryFinder>(RegistryFinder).toSelf();
    container.bind<RegistryUpdater>(RegistryUpdater).toSelf();
    container.bind<RegistryDeleter>(RegistryDeleter).toSelf();

    container.bind<RegistryRepository>(TYPES.RegistryRepository).to(RegistryMysqlRepository);
    container.bind<UuidAdapter>(TYPES.RegistryUUIDGenerator).to(UuidAdapter);
}

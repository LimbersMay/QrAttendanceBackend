import { RegistryEntity } from './registry.entity';
import {RegistryQuery} from "./entities/registry.query";
import {Either} from "../../../shared/types/ErrorEither";
import {RegistryError} from "./errors/registry.error";

export interface IRegistryRepository {
    createRegistry(registry: RegistryEntity): Promise<RegistryEntity>;
    deleteRegistry(registryId: string, userId: string): Promise<Either<RegistryError, number>>;
    updateRegistry(fields: RegistryQuery, registryId: string, userId: string): Promise<Either<RegistryError, number>>;
    findRegistryById(registryId: string, userId: string): Promise<Either<RegistryError, RegistryEntity>>;
    findRegistriesByUserId(userId: string): Promise<Either<RegistryError, RegistryEntity[]>>;
}

import {Either} from "../../shared";
import { RegistryEntity } from './registry.entity';
import {RegistryQuery} from "./registry.query";
import {RegistryErrors} from "./registryErrors";

export interface RegistryRepository {
    createRegistry(registry: RegistryEntity): Promise<RegistryEntity>;
    deleteRegistry(registryId: string, userId: string): Promise<Either<RegistryErrors, number>>;
    updateRegistry(fields: RegistryQuery, registryId: string, userId: string): Promise<Either<RegistryErrors, number>>;
    findRegistryById(registryId: string, userId: string): Promise<Either<RegistryErrors, RegistryEntity>>;
    findRegistriesByUserId(userId: string): Promise<Either<RegistryErrors, RegistryEntity[]>>;
}

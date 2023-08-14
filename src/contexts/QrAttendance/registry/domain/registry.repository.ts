import {Criteria, Either} from "../../shared";
import {RegistryEntity, RegistryQuery, RegistryError} from "./";

export interface RegistryRepository {
    findAll(specifications: Criteria): Promise<RegistryEntity[]>;
    findOne(specifications: Criteria): Promise<Either<RegistryError, RegistryEntity>>;
    createRegistry(registry: RegistryEntity): Promise<RegistryEntity>;
    updateRegistry(fields: RegistryQuery, specifications: Criteria): Promise<Either<RegistryError, number>>;
    deleteRegistry(specifications: Criteria): Promise<Either<RegistryError, number>>;
}

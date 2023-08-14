import {Criteria, Either} from "../../shared";
import {RegistryEntity, RegistryQuery, RegistryErrors} from "./";

export interface RegistryRepository {
    findAll(specifications: Criteria): Promise<RegistryEntity[]>;
    findOne(specifications: Criteria): Promise<Either<RegistryErrors, RegistryEntity>>;
    createRegistry(registry: RegistryEntity): Promise<RegistryEntity>;
    updateRegistry(fields: RegistryQuery, specifications: Criteria): Promise<Either<RegistryErrors, number>>;
    deleteRegistry(specifications: Criteria): Promise<Either<RegistryErrors, number>>;
}

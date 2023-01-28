import {IRegistryRepository} from "../../domain/registry.repository";
import {RegistryEntity} from "../../domain/registry.entity";

export class RegistryRepository implements IRegistryRepository {

    constructor() {}

    async createRegistry(registry: RegistryEntity): Promise<RegistryEntity | null> {
        throw new Error('Not implemented');
    }

    deleteRegistry(registryId: string): Promise<RegistryEntity | null> {
        throw new Error('Not implemented');
    }

    updateRegistry(registry: RegistryEntity, registryId: string): Promise<RegistryEntity | null> {
        throw new Error('Not implemented');
    }

    findRegistryById(registryId: string): Promise<RegistryEntity | null> {
        throw new Error('Not implemented');
    }

}

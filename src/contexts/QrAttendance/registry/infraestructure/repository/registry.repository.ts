import {IRegistryRepository} from "../../domain/registry.repository";
import {RegistryEntity} from "../../domain/registry.entity";
import {RegistryMapperService} from "../mappers/registry.mapper";

import Registry from "../model/registry.schema";

export class RegistryRepository implements IRegistryRepository {

    constructor( private RegistryMapperService: RegistryMapperService ) {}

    async createRegistry(registry: RegistryEntity): Promise<RegistryEntity | null> {
        const mappedRegistry = this.RegistryMapperService.toDto(registry);
        const registryCreated = await Registry.create(mappedRegistry);

        return this.RegistryMapperService.toDomain(registryCreated);
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

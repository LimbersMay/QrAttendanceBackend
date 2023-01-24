import { RegistryEntity } from './registry.entity';

export interface IRegistryRepository {
    createRegistry(registry: RegistryEntity): Promise<RegistryEntity | null>;
    deleteRegistry(registryId: string): Promise<RegistryEntity | null>;
    updateRegistry(registry: RegistryEntity, registryId: string): Promise<RegistryEntity | null>;
    findRegistryById(registryId: string): Promise<RegistryEntity | null>;
}

import * as E from 'fp-ts/lib/Either';
import {RegistryRepository} from "../../../domain/registry.repository";
import {RegistryError} from "../../../domain/errors/registry.error";
import {RegistryResponse} from "../../responses/registry.response";
import {Either} from "../../../../../shared/types/ErrorEither";
import {RegistryEntity} from "../../../domain/registry.entity";

export class RegistryFinder {
    constructor(
        private readonly registryRepository: RegistryRepository,
    ) {
    }

    async findRegistryById(registryId: string, userId: string): Promise<Either<RegistryError, RegistryResponse>> {
        return this.registryRepository.findRegistryById(registryId, userId).then(registry => {
            return E.fold(
                () => E.left(RegistryError.REGISTRY_NOT_FOUND),
                (registry: RegistryEntity) => E.right(RegistryResponse.fromRegistry(registry))
            )(registry)

        }).catch(() => E.left(RegistryError.REGISTRY_CANNOT_BE_FOUND));
    }

    async findRegistriesByUserId(userId: string): Promise<Either<RegistryError, RegistryResponse[]>> {
        return this.registryRepository.findRegistriesByUserId(userId).then(registries => {
            return E.fold(
                () => E.left(RegistryError.REGISTRIES_NOT_FOUND),
                (registries: RegistryEntity[]) => E.right(RegistryResponse.fromRegistries(registries))
            )(registries)

        }).catch(() => E.left(RegistryError.REGISTRIES_CANNOT_BE_FOUND));
    }
}

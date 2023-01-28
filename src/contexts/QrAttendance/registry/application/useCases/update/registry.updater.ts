import * as E from 'fp-ts/lib/Either';
import {RegistryError} from "../../../domain/errors/registry.error";
import {RegistryRepository} from "../../../domain/registry.repository";
import {RegistryQuery} from "../../../domain/entities/registry.query";

export class RegistryUpdater {
    constructor(
        private readonly registryRepository: RegistryRepository
    ) {}

    async update(fields: RegistryQuery, registryId: string, userId: string): Promise<E.Either<RegistryError, number>> {
        return this.registryRepository.updateRegistry(fields, registryId, userId).then(result => {
            return E.fold(
                () => E.left(RegistryError.REGISTRY_NOT_FOUND),
                (rowsUpdated: number) => E.right(rowsUpdated)
            )(result)

        }).catch(() => E.left(RegistryError.REGISTRY_CANNOT_BE_UPDATED));

    }
}

import * as E from 'fp-ts/lib/Either';
import {RegistryError} from "../../../domain/errors/registry.error";
import {RegistryRepository} from "../../../domain/registry.repository";
import {Either} from "../../../../../shared/types/ErrorEither";

export class RegistryDeleter {
    constructor(
        private readonly registryRepository: RegistryRepository,
    ){}

    async deleteRegistry(registryId: string, userId: string): Promise<Either<RegistryError, number>> {
        return this.registryRepository.deleteRegistry(registryId, userId).then(registry => {
            return E.fold(
                () => E.left(RegistryError.REGISTRY_NOT_FOUND),
                (rowsDeleted: number) => E.right(rowsDeleted)
            )(registry)

        }).catch(() => E.left(RegistryError.REGISTRY_CANNOT_BE_DELETED));
    }
}
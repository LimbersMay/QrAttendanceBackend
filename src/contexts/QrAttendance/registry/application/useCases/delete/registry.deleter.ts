import {inject, injectable} from "inversify";
import * as E from 'fp-ts/lib/Either';
import {Either} from "../../../../shared";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";
import {RegistryError} from "../../../domain/errors/registry.error";
import {RegistryRepository} from "../../../domain/registry.repository";

@injectable()
export class RegistryDeleter {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository,
    ){}

    execute = async(registryId: string, userId: string): Promise<Either<RegistryError, number>> => {
        return this.registryRepository.deleteRegistry(registryId, userId).then(registry => {
            return E.fold(
                () => E.left(RegistryError.REGISTRY_NOT_FOUND),
                (rowsDeleted: number) => E.right(rowsDeleted)
            )(registry)

        }).catch(() => E.left(RegistryError.REGISTRY_CANNOT_BE_DELETED));
    }
}
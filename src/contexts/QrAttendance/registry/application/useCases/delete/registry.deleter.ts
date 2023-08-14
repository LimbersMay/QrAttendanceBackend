import {inject, injectable} from "inversify";
import * as E from 'fp-ts/lib/Either';
import {Either} from "../../../../shared";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";
import {RegistryErrors} from "../../../domain/registryErrors";
import {RegistryRepository} from "../../../domain/registry.repository";

@injectable()
export class RegistryDeleter {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository,
    ){}

    execute = async(registryId: string, userId: string): Promise<Either<RegistryErrors, number>> => {
        return this.registryRepository.deleteRegistry(registryId, userId).then(registry => {
            return E.fold(
                () => E.left(RegistryErrors.REGISTRY_NOT_FOUND),
                (rowsDeleted: number) => E.right(rowsDeleted)
            )(registry)

        }).catch(() => E.left(RegistryErrors.REGISTRY_CANNOT_BE_DELETED));
    }
}
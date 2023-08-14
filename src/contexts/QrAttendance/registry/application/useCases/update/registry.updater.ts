import * as E from 'fp-ts/lib/Either';
import {RegistryErrors} from "../../../domain/registryErrors";
import {RegistryRepository} from "../../../domain/registry.repository";
import {RegistryQuery} from "../../../domain/registry.query";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";

@injectable()
export class RegistryUpdater {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository
    ) {}

    execute = async(fields: RegistryQuery, registryId: string, userId: string): Promise<E.Either<RegistryErrors, number>> => {
        return this.registryRepository.updateRegistry(fields, registryId, userId).then(result => {
            return E.fold(
                () => E.left(RegistryErrors.REGISTRY_NOT_FOUND),
                (rowsUpdated: number) => E.right(rowsUpdated)
            )(result)

        }).catch(() => E.left(RegistryErrors.REGISTRY_CANNOT_BE_UPDATED));

    }
}

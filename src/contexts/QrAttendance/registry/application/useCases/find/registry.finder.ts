import {inject, injectable} from "inversify";
import * as E from 'fp-ts/lib/Either';
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";
import {Either} from "../../../../shared";
import {RegistryResponse} from "../../responses/registry.response";
import {RegistryRepository} from "../../../domain/registry.repository";
import {RegistryError} from "../../../domain/errors/registry.error";
import {RegistryEntity} from "../../../domain/registry.entity";

@injectable()
export class RegistryFinder {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository,
    ) {
    }

    async execute(registryId: string, userId: string): Promise<Either<RegistryError, RegistryResponse>> {
        return this.registryRepository.findRegistryById(registryId, userId).then(registry => {
            return E.fold(
                () => E.left(RegistryError.REGISTRY_NOT_FOUND),
                (registry: RegistryEntity) => E.right(RegistryResponse.fromRegistry(registry))
            )(registry)

        }).catch(() => E.left(RegistryError.REGISTRY_CANNOT_BE_FOUND));
    }

    executeByUserId = async(userId: string): Promise<Either<RegistryError, RegistryResponse[]>> => {
        return this.registryRepository.findRegistriesByUserId(userId).then(registries => {
            return E.fold(
                () => E.left(RegistryError.REGISTRIES_NOT_FOUND),
                (registries: RegistryEntity[]) => E.right(RegistryResponse.fromRegistries(registries))
            )(registries)

        }).catch(() => E.left(RegistryError.REGISTRIES_CANNOT_BE_FOUND));
    }
}

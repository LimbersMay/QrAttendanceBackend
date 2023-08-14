import {inject, injectable} from "inversify";
import * as E from 'fp-ts/lib/Either';
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";
import {Either} from "../../../../shared";
import {RegistryResponse} from "../../responses/registry.response";
import {RegistryRepository} from "../../../domain/registry.repository";
import {RegistryErrors} from "../../../domain/registryErrors";
import {RegistryEntity} from "../../../domain/registry.entity";

@injectable()
export class RegistryFinder {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository,
    ) {
    }

    async execute(registryId: string, userId: string): Promise<Either<RegistryErrors, RegistryResponse>> {
        return this.registryRepository.findRegistryById(registryId, userId).then(registry => {
            return E.fold(
                () => E.left(RegistryErrors.REGISTRY_NOT_FOUND),
                (registry: RegistryEntity) => E.right(RegistryResponse.fromRegistry(registry))
            )(registry)

        }).catch(() => E.left(RegistryErrors.REGISTRY_CANNOT_BE_FOUND));
    }

    executeByUserId = async(userId: string): Promise<Either<RegistryErrors, RegistryResponse[]>> => {
        return this.registryRepository.findRegistriesByUserId(userId).then(registries => {
            return E.fold(
                () => E.left(RegistryErrors.REGISTRIES_NOT_FOUND),
                (registries: RegistryEntity[]) => E.right(RegistryResponse.fromRegistries(registries))
            )(registries)

        }).catch(() => E.left(RegistryErrors.REGISTRIES_CANNOT_BE_FOUND));
    }
}

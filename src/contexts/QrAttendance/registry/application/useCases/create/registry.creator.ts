
import * as E from 'fp-ts/lib/Either';
import {RegistryRepository} from "../../../domain/registry.repository";
import {RegistryError} from "../../../domain/errors/registry.error";
import {RegistryResponse} from "../../responses/registry.response";
import {Either} from "../../../../../shared/types/ErrorEither";
import {RegistryValue} from "../../../domain/registry.value";
import {UUIDGenerator} from "../../../../shared/application/services/UUIDGenerator";

export class RegistryCreator {
    constructor(
        private readonly registryRepository: RegistryRepository,
        private readonly uuidGenerator: UUIDGenerator
    ){}

    async createRegistry(qrCodeId: string, ownerId: string, name: string, firstSurname: string, secondSurname: string): Promise<Either<RegistryError, RegistryResponse>> {

        const registry = RegistryValue.create({
            registryId: this.uuidGenerator.random(),
            qrCodeId,
            ownerId,
            name,
            firstSurname,
            secondSurname
        })

        return this.registryRepository.createRegistry(registry).then(registry => {
            return E.right(RegistryResponse.fromRegistry(registry))
        }).catch(() => E.left(RegistryError.REGISTRY_CANNOT_BE_CREATED));
    }
}

import {inject, injectable} from "inversify";
import * as E from 'fp-ts/lib/Either';
import {RegistryRepository} from "../../../domain/registry.repository";
import {RegistryError} from "../../../domain/errors/registry.error";
import {RegistryResponse} from "../../responses/registry.response";
import {Either} from "../../../../../shared/types/ErrorEither";
import {RegistryValue} from "../../../domain/registry.value";
import {UUIDGenerator} from "../../../../shared/application/services/UUIDGenerator";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";

@injectable()
export class RegistryCreator {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository,
        @inject(TYPES.RegistryUUIDGenerator) private uuidGenerator: UUIDGenerator
    ){}

    async execute(qrId: string, ownerId: string, name: string, firstSurname: string, secondSurname: string): Promise<Either<RegistryError, RegistryResponse>> {

        const registry = RegistryValue.create({
            registryId: this.uuidGenerator.random(),
            qrId,
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

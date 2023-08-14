import {inject, injectable} from "inversify";
import * as E from 'fp-ts/lib/Either';
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";
import {Either, UUIDGenerator} from "../../../../shared";
import {RegistryResponse} from "../../responses/registry.response";
import {RegistryRepository} from "../../../domain/registry.repository";
import {RegistryError} from "../../../domain/registryError";
import {RegistryValue} from "../../../domain/registry.value";

@injectable()
export class RegistryCreator {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository,
        @inject(TYPES.RegistryUUIDGenerator) private uuidGenerator: UUIDGenerator
    ){}

    async execute(qrId: string, ownerId: string, name: string, group: string, career: string, firstSurname: string, secondSurname: string): Promise<Either<RegistryError, RegistryResponse>> {

        const registry = RegistryValue.create({
            registryId: this.uuidGenerator.random(),
            qrId,
            ownerId,
            name,
            group,
            career,
            firstSurname,
            secondSurname
        })

        return this.registryRepository.createRegistry(registry).then(registry => {
            return E.right(RegistryResponse.fromRegistry(registry))
        }).catch((error) => {
            console.log(error);
            return E.left(RegistryError.REGISTRY_CANNOT_BE_CREATED);
        });
    }
}

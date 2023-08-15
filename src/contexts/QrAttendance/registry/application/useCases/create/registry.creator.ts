import {inject, injectable} from "inversify";
import {right, left } from 'fp-ts/Either';
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";
import {Either, UUIDGenerator} from "../../../../shared";
import {RegistryError, RegistryRepository, RegistryValue} from "../../../domain";
import {RegistryResponse} from "../../responses";
import {CreateRegistryDTO} from "../../validations/registry.create";


@injectable()
export class RegistryCreator {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository,
        @inject(TYPES.RegistryUUIDGenerator) private uuidGenerator: UUIDGenerator
    ){}

    async execute(registryDTO: CreateRegistryDTO, ownerId: string): Promise<Either<RegistryError, RegistryResponse>> {

        const registry = RegistryValue.create({
            ...registryDTO,
            registryId: this.uuidGenerator.random(),
            ownerId,
        });

        try {
            const result = await this.registryRepository.createRegistry(registry);
            return right(RegistryResponse.fromRegistry(result));
        } catch (error) {
            return left(RegistryError.REGISTRY_CANNOT_BE_CREATED);
        }
    }
}

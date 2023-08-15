import {inject, injectable} from "inversify";
import {fold, left, right} from 'fp-ts/Either';
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";
import {Criteria, Either} from "../../../../shared";
import {RegistryResponse} from "../../responses";
import {RegistryEntity, RegistryError, RegistryRepository} from "../../../domain";

@injectable()
export class RegistryFinder {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository,
    ) {
    }

    async findOne(specifications: Criteria): Promise<Either<RegistryError, RegistryResponse>> {

        try {
            const result = await this.registryRepository.findOne(specifications);

            return fold(
                () => left(RegistryError.REGISTRY_NOT_FOUND),
                (registry: RegistryEntity) => right(RegistryResponse.fromRegistry(registry))
            )(result)

        } catch (error) {
            console.log(error)
            return left(RegistryError.REGISTRY_CANNOT_BE_FOUND);
        }
    }

    public async findAll(specifications: Criteria): Promise<Either<RegistryError, RegistryResponse[]>> {

        try {
            const registries = await this.registryRepository.findAll(specifications);
            return right(RegistryResponse.fromRegistries(registries));
        } catch (error) {
            console.log(error)
            return left(RegistryError.REGISTRIES_CANNOT_BE_FOUND);
        }
    }
}

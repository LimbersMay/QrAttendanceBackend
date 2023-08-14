import { left, right, fold } from 'fp-ts/Either';
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";
import {Criteria, Either} from "../../../../shared";
import {RegistryError, RegistryQuery, RegistryRepository} from "../../../domain";

@injectable()
export class RegistryUpdater {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository
    ) {}

    execute = async(fields: RegistryQuery, specifications: Criteria): Promise<Either<RegistryError, number>> => {

        try {
            const result = await this.registryRepository.updateRegistry(fields, specifications);

            return fold(
                () => left(RegistryError.REGISTRY_NOT_FOUND),
                (rowsUpdated: number) => right(rowsUpdated)
            )(result);

        } catch (error) {
            console.log(error);
            return left(RegistryError.REGISTRY_CANNOT_BE_UPDATED);
        }
    }
}

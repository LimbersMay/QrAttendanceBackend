import { left, right, fold } from 'fp-ts/Either';
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";
import {Criteria, Either} from "../../../../shared";
import {RegistryErrors, RegistryQuery, RegistryRepository} from "../../../domain";

@injectable()
export class RegistryUpdater {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository
    ) {}

    execute = async(fields: RegistryQuery, specifications: Criteria): Promise<Either<RegistryErrors, number>> => {

        try {
            const result = await this.registryRepository.updateRegistry(fields, specifications);

            return fold(
                () => left(RegistryErrors.REGISTRY_NOT_FOUND),
                (rowsUpdated: number) => right(rowsUpdated)
            )(result);

        } catch (error) {
            console.log(error);
            return left(RegistryErrors.REGISTRY_CANNOT_BE_UPDATED);
        }
    }
}

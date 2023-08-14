import {inject, injectable} from "inversify";
import { left, right, fold } from 'fp-ts/Either';
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/registry/types";
import {Criteria, Either} from "../../../../shared";
import {RegistryErrors, RegistryRepository} from "../../../domain";

@injectable()
export class RegistryDeleter {
    constructor(
        @inject(TYPES.RegistryRepository) private registryRepository: RegistryRepository,
    ){}

    execute = async(specifications: Criteria): Promise<Either<RegistryErrors, number>> => {

        try {
            const result = await this.registryRepository.deleteRegistry(specifications);

            return fold(
                () => left(RegistryErrors.REGISTRY_NOT_FOUND),
                (rowsDeleted: number) => right(rowsDeleted)
            )(result);

        } catch (error) {
            console.log(error)
            return left(RegistryErrors.REGISTRY_CANNOT_BE_DELETED);
        }
    }
}
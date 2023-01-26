import {MapperService} from "../../../shared/infrastructure/mappers/mapper";
import {RegistryEntity} from "../../domain/registry.entity";
import {RegistryDTO} from "../../application/DTOs/registryDTO";
export class RegistryMapperService extends MapperService<any, RegistryEntity>{
    protected mapToDomain(entity: any): RegistryEntity {
        return {
            registryId: entity.registry_id,
            qrCodeId: entity.qrCodeId,
            name: entity.name,
            firstSurname: entity.mothers_name,
            secondSurname: entity.fathers_name,
            createdAt: entity.created_at,
            updatedAt: entity.updated_at
        }
    }
    protected mapToPersistance(entity: RegistryEntity): any {
        return {
            registry_id: entity.registryId,
            name: entity.name,
            firstSurname: entity.firstSurname,
            secondSurname: entity.secondSurname,
            created_at: entity.createdAt,
            updated_at: entity.updatedAt
        }
    }

    protected mapToDTO(entity: RegistryEntity): RegistryDTO {
        return {
            registryId: entity.registryId,
            name: entity.name,
            firstSurname: entity.firstSurname,
            secondSurname: entity.secondSurname,
            createdAt: entity.createdAt
        }
    }
}

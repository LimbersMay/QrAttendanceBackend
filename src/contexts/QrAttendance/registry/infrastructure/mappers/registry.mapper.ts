import {MapperService} from "../../../shared/infrastructure/mappers/mapper";
import {RegistryEntity} from "../../domain/registry.entity";
import {RegistryDTO} from "../../application/DTOs/registryDTO";
export class RegistryMapperService extends MapperService<any, RegistryEntity>{
    protected mapToDomain(entity: any): RegistryEntity {
        return {
            registryId: entity.registry_id,
            name: entity.name,
            mothersName: entity.mothers_name,
            fathersName: entity.fathers_name,
            createdAt: entity.created_at,
            updatedAt: entity.updated_at
        }
    }
    protected mapToPersistance(entity: RegistryEntity): any {
        return {
            registry_id: entity.registryId,
            name: entity.name,
            mothers_name: entity.mothersName,
            fathers_name: entity.fathersName,
            created_at: entity.createdAt,
            updated_at: entity.updatedAt
        }
    }

    protected mapToDTO(entity: RegistryEntity): RegistryDTO {
        return {
            registryId: entity.registryId,
            name: entity.name,
            mothersName: entity.mothersName,
            fathersName: entity.fathersName,
            createdAt: entity.createdAt
        }
    }
}

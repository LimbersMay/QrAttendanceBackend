import {MapperService} from "../../../shared/infraestructure/mappers/mapper";
import {RegistryEntity} from "../../domain/registry.entity";
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
    protected mapToDto(entity: RegistryEntity): any {
        return {
            registry_id: entity.registryId,
            name: entity.name,
            mothers_name: entity.mothersName,
            fathers_name: entity.fathersName,
            created_at: entity.createdAt,
            updated_at: entity.updatedAt
        }
    }
}

import {MapperService} from "../../../shared/infrastructure/mappers/mapper";
import {GroupEntity} from "../../domain/group.entity";
import {GroupDTO} from "../../application/entities/group.dto";
import {GroupPersistance} from "../../application/entities/group.persistance";

export class GroupMapper extends MapperService<any, GroupEntity> {
    protected mapToDTO(entity: GroupEntity): GroupDTO {
        return {
            id: entity.groupId,
            name: entity.name,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        }
    }

    // from persistance to domain
    protected mapToDomain(entity: GroupPersistance): GroupEntity {
        return {
            groupId: entity.groupId,
            userId: entity.userId,
            name: entity.name,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        };
    }
}

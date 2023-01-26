import { MapperService } from '../../../shared/infrastructure/mappers/mapper';
import { UserEntity } from '../../domain';
import {UserDTO} from "../../application/entities/user.dto";

export class UserMapperService extends MapperService<UserDTO, UserEntity> {
    protected mapToDomain(entity: any): UserEntity {
        return {
            userId: entity.id,
            name: entity.name,
            email: entity.email,
            password: entity.password,
            lastname: entity.lastname,
            updatedAt: entity.updatedAt,
            createdAt: entity.createdAt
        }
    }

    protected mapToDTO(entity: UserEntity): UserDTO {
        return {
            id: entity.userId,
            name: entity.name,
            email: entity.email,
            lastname: entity.lastname
        }
    }
}

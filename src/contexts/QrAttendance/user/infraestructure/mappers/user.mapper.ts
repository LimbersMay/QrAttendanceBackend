import { MapperService } from '../../../shared/infraestructure/mappers/mapper';
import { UserEntity } from '../../domain/user.entity';
import {UserDTO} from "../../application/DTOs/userDTO";

export class UserMapperService extends MapperService<any, UserEntity> {
    protected mapToDomain(entity: any): UserEntity {
        return {
            userId: entity.user_id,
            name: entity.name,
            email: entity.email,
            password: entity.password,
            lastname: entity.lastname,
            updatedAt: entity.updated_at,
            createdAt: entity.created_at
        }
    }

    protected mapToPersistance(entity: UserEntity): any {
        return {
            user_id: entity.userId,
            name: entity.name,
            email: entity.email,
            password: entity.password,
            lastname: entity.lastname,
            updated_at: entity.updatedAt,
            created_at: entity.createdAt
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

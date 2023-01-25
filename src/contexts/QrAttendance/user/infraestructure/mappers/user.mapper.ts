import { MapperService } from '../../../shared/infraestructure/mappers/mapper';
import { UserEntity } from '../../domain/user.entity';
import {UserDTO} from "../../application/DTOs/userDTO";

export class UserMapperService extends MapperService<any, UserEntity> {
    protected mapToDomain(entity: any): UserEntity {
        return {
            id: entity.user_id,
            name: entity.name,
            email: entity.email,
            password: entity.password,
            lastname: entity.lastname,
            updatedAt: entity.updatedAt,
            createdAt: entity.createdAt
        }
    }

    protected mapToPersistance(entity: UserEntity): any {
        return {
            user_id: entity.id,
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
            id: entity.id,
            name: entity.name,
            email: entity.email,
            lastname: entity.lastname
        }
    }
}

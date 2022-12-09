import { MapperService } from '../../../shared/infraestructure/mappers/mapper';
import { UserEntity } from '../../domain/user.entity';

export class UserMapperService extends MapperService<any, UserEntity> {
    protected mapToDomain(entity: any): UserEntity {
        return {
            userId: entity.user_id,
            name: entity.name,
            email: entity.email,
            password: entity.password,
            mothersName: entity.mothers_name,
            fathersName: entity.fathers_name,
            updatedAt: entity.updated_at,
            createdAt: entity.created_at
        }
    }

    protected mapToDto(entity: UserEntity): any {
        return {
            user_id: entity.userId,
            name: entity.name,
            email: entity.email,
            password: entity.password,
            mothers_name: entity.mothersName,
            fathers_name: entity.fathersName,
            updated_at: entity.updatedAt,
            created_at: entity.createdAt
        }
    }
}

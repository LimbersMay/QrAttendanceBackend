import { MapperService } from './mapper';
import { UserEntity } from '../../domain/user.entity';

export class UserMapperService extends MapperService<any, UserEntity> {
    protected map(entity: any): UserEntity {
        return {
            name: entity.name,
            email: entity.email,
            password: entity.password,
            mothersName: entity.mothers_name,
            fathersName: entity.fathers_name,
            updatedAt: entity.updated_at,
            createdAt: entity.created_at
        }
    }
}

export class DtoMapperService extends MapperService<UserEntity, any> {
    protected map(entity: UserEntity): any {
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

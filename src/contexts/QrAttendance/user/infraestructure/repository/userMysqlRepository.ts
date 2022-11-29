import {UserEntity} from '../../domain/user.entity';
import {UserRepository} from '../../domain/user.repository';

import User from '../model/user.schema';
import { UserMapperService} from "../mappers/user.mapper";

export class MysqlRepository implements UserRepository {

    public constructor(private userMapperService: UserMapperService){}

    async findUserById(userId: string): Promise<UserEntity | null> {
        const user = await User.findByPk(userId);
        return this.userMapperService.toDomain(user);
    }

    async loginUser({email, password}: {email: string, password: string}): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }

    async createUser(user: UserEntity): Promise<UserEntity | null> {
        const mappedUser = this.userMapperService.toDto(user);
        const userCreated = await User.create(mappedUser);
        return this.userMapperService.toDomain(userCreated);
    }

    async listUser(): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }
}

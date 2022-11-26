import {UserEntity} from '../../domain/user.entity';
import {UserRepository} from '../../domain/user.repository';

import User from '../model/user.schema';
import {DtoMapperService, UserMapperService} from "../mappers/user.mapper";

export class MysqlRepository implements UserRepository {

    public constructor(private userMapperService: UserMapperService, private dtoMapperService: DtoMapperService){}

    async findUserById(userId: string): Promise<UserEntity | null> {
        const user = await User.findByPk(userId);
        return this.userMapperService.transform(user);
    }

    async loginUser({email, password}: {email: string, password: string}): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }

    async createUser(user: UserEntity): Promise<UserEntity | null> {
        const mappedUser = this.dtoMapperService.transform(user);
        const userCreated = await User.create(mappedUser);
        return this.userMapperService.transform(userCreated);
    }

    async listUser(): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }
}

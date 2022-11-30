import {UserEntity} from '../../domain/user.entity';
import {UserRepository} from '../../domain/user.repository';

import User from '../model/user.schema';
import { UserMapperService} from "../mappers/user.mapper";

export class UserMysqlRepository implements UserRepository {

    public constructor(private userMapperService: UserMapperService){}
    async findUserBy(query: any): Promise<UserEntity | null> {
        const user = await User.findOne({
            where: query
        });
        return this.userMapperService.toDomain(user);
    }
    async findUserById(userId: string): Promise<UserEntity | null> {
        const user = await User.findByPk(userId);
        return this.userMapperService.toDomain(user);
    }
    async createUser(user: UserEntity): Promise<UserEntity | null> {
        const mappedUser = this.userMapperService.toDto(user);
        const userCreated = await User.create(mappedUser);
        return this.userMapperService.toDomain(userCreated);
    }
    async deleteUser(userId: string): Promise<UserEntity | null> {

        const user = await User.findByPk(userId);

        await User.destroy({
            where: {
                user_id: userId
            }
        });

        return this.userMapperService.toDomain(user);
    }
    async updateUser(fields: any, userId: string): Promise<UserEntity | null> {

        await User.update(
            fields,
            {
                where: {
                    user_id: userId
                }
            }
        )

        const affedtedUser = User.findByPk(userId);

        return this.userMapperService.toDomain(affedtedUser);
    }
    async listUsers(): Promise<UserEntity | null> {
        const users = await User.findAll();

        return this.userMapperService.toDomain(users);
    }
}

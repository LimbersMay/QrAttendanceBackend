import { UserEntity } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import User from '../model/user.schema';

export class MysqlRepository implements UserRepository {

    async findUserById(userId: string): Promise<any> {
        const user = await User.findByPk(userId);
        return user;
    }

    async loginUser({email, password}: {email: string, password: string}): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }

    async createUser(user: UserEntity): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }

    async listUser(): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }
}

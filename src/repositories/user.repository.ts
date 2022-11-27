import {UserRepository} from "../interfaces/user/user.repository";
import {UserEntity} from "../interfaces/user/user.entity";
import {MapperService} from "../mappers/mapper";
import User from "../models/user.schema";

export class UserMysqlRepository implements UserRepository {

    constructor( private  userMapperService: MapperService<any, UserEntity>) {}

    createUser = async(user: UserEntity): Promise<UserEntity | null> => {
        const mappedUser = this.userMapperService.toDto(user);
        const userCreated = await User.create(mappedUser);
        return this.userMapperService.toDomain(userCreated);
    }

    findUserById = async(userId: string): Promise<UserEntity | null> => {
        const user = await User.findByPk(userId);
        return this.userMapperService.toDomain(user);
    }

    listUser(): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }

    modifyUser(user: UserEntity): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }

}

import {UserRepository} from '../domain/user.repository';
import {UserEntity} from '../domain/user.entity';
import {UserValue} from '../domain/user.value';

export class UserUseCase {
    constructor( private readonly userRepository: UserRepository ) {}

    public registerUser = async ({userId, name, email, password, mothersName, fathersName}: UserEntity) => {
        const userValue = new UserValue({userId, name, email, password, mothersName, fathersName});
        return await this.userRepository.createUser(userValue);
    }

    public findUserById = async (userId: string) => {
        return await this.userRepository.findUserById(userId);
    }

    public registerQr = async () => {};
} 

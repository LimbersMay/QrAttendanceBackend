import { UserRepository } from '../domain/user.repository';
import { UserEntity } from '../domain/user.entity';
import { UserValue } from '../domain/user.value';

export class UserUseCase {
    constructor( private readonly userRepository: UserRepository ) {}

    public registerUser = async ({name, email, password, mothersName, fathersName}: UserEntity) => {
        const userValue = new UserValue({name, email, password, mothersName, fathersName});
        const userCreated = await this.userRepository.createUser(userValue)
        return userCreated;
    }

    public loginUser = async ({email, password}: {email: string, password: string}) => {
        const user = await this.userRepository.loginUser({email, password});
        return user;
    }

    public findUserById = async (userId: string) => {
        const user = await this.userRepository.findUserById(userId);
        return user;
    }

    public registerQr = async () => {};
} 

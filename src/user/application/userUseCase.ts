import { UserRepository } from '../domain/user.repository';
import { UserEntity } from '../domain/user.entity';
import { UserValue } from '../domain/user.value';

export class userUseCase {
    constructor( private readonly userRepository: UserRepository ) {

    }

    public async registerUser({name, email, password, mothersName, fathersName}: UserEntity) {
        const userValue = new UserValue({name, email, password, mothersName, fathersName});
        const userCreated = await this.userRepository.registerUser(userValue)
        return userCreated;
    }

    public async registerQr() {}
} 

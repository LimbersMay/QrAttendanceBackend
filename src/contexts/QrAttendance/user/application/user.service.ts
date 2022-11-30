import {UserRepository} from '../domain/user.repository';
import {UserEntity} from '../domain/user.entity';
import {UserValue} from '../domain/user.value';
import {EncryptService} from "../../shared/application/services/encrypt.service";
import {UuiService} from "../../shared/application/services/uui.service";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly encryptService: EncryptService,
        private readonly uuidService: UuiService
    ) {}

    public registerUser = async ({userId, name, email, password, mothersName, fathersName}: UserEntity) => {

        userId = this.uuidService.random();
        password = await this.encryptService.hash(password);

        const userValue = new UserValue({userId, name, email, password, mothersName, fathersName});
        return await this.userRepository.createUser(userValue);
    }

    public findUserById = async (userId: string) => {
        return await this.userRepository.findUserById(userId);
    }

    public registerQr = async () => {};
} 

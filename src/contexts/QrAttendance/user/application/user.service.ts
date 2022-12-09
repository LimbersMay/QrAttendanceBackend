import {UserRepository} from '../domain/user.repository';
import {UserEntity} from '../domain/user.entity';
import {UserValue} from '../domain/user.value';
import {EncryptService} from "../../shared/application/services/encrypt.service";
import {UuiService} from "../../shared/application/services/uui.service";
import {QrCodeRepository} from "../../qr_code/domain/qrCode.repository";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly qrCodeRepository: QrCodeRepository,
        private readonly encryptService: EncryptService,
        private readonly uuidService: UuiService
    ) {}

    public registerUser = async ({name, email, password, mothersName, fathersName}: { name: string, email: string, password: string, mothersName: string, fathersName: string }) => {

        const userId = this.uuidService.random();
        password = await this.encryptService.hash(password);

        const userValue = new UserValue({userId, name, email, password, mothersName, fathersName});
        return await this.userRepository.createUser(userValue);
    }

    public registerQr = async (userId: string) => {

    };
} 

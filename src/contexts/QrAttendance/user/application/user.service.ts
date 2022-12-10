import {UserRepository} from '../domain/user.repository';
import {QrCodeRepository} from "../../qr_code/domain/qrCode.repository";

import {UserValue} from '../domain/user.value';
import {QrCodeValue} from "../../qr_code/domain/qrCode.value";

import {EncryptService} from "../../shared/application/services/encrypt.service";
import {UuiService} from "../../shared/application/services/uui.service";
import {UserQuery} from "../domain/user.query";


export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly qrCodeRepository: QrCodeRepository,
        private readonly encryptService: EncryptService,
        private readonly uuidService: UuiService
    ) {}

    public findUserById = async (userId: string) => {
        return await this.userRepository.findUserById(userId);
    }

    public registerUser = async ({name, email, password, mothersName, fathersName}: { name: string, email: string, password: string, mothersName: string, fathersName: string }) => {

        const userId = this.uuidService.random();
        password = await this.encryptService.hash(password);

        const userValue = new UserValue({userId, name, email, password, mothersName, fathersName});
        return await this.userRepository.createUser(userValue);
    }

    public updateUser = async(fields: UserQuery, userId: string) => {
        return await this.userRepository.updateUser(fields, userId);
    }
    public deleteUser = async(userId: string) => {
        return await this.userRepository.deleteUser(userId);
    }

    public registerQr = async ({userId, name, url}: {userId: string, name: string, url: string}) => {

        const qrId = this.uuidService.random();
        const qrCodeValue = new QrCodeValue({qrId, userId, name, url});

        return await this.qrCodeRepository.createQrCode(qrCodeValue);
    };
} 

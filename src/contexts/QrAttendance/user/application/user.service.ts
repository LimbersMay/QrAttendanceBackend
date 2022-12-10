import {UserRepository} from '../domain/user.repository';
import {QrCodeRepository} from "../../qr_code/domain/qrCode.repository";

import {UserValue} from '../domain/user.value';
import {QrCodeValue} from "../../qr_code/domain/qrCode.value";

import {EncryptService} from "../../shared/application/services/encrypt.service";
import {UuiService} from "../../shared/application/services/uui.service";
import {UserQuery} from "../domain/user.query";
import {UserMapperService} from "../infraestructure/mappers/user.mapper";


export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly qrCodeRepository: QrCodeRepository,
        private readonly encryptService: EncryptService,
        private readonly userMapperService: UserMapperService,
        private readonly uuidService: UuiService
    ) {}

    public findUserById = async (userId: string) => {

        const user = await this.userRepository.findUserById(userId);

        if (!user) return null;

        return this.userMapperService.toDTO(user);
    }

    public registerUser = async ({name, email, password, mothersName, fathersName}: { name: string, email: string, password: string, mothersName: string, fathersName: string }) => {

        const userId = this.uuidService.random();
        password = await this.encryptService.hash(password);

        const userValue = new UserValue({userId, name, email, password, mothersName, fathersName});
        const user = await this.userRepository.createUser(userValue);

        if (!user) return null;

        return await this.userMapperService.toDTO(user);
    }

    public updateUser = async(fields: UserQuery, userId: string) => {
        const user = await this.userRepository.updateUser(fields, userId);
        if (!user) return;

        return this.userMapperService.toDTO(user);
    }
    public deleteUser = async(userId: string) => {

        const user = await this.userRepository.deleteUser(userId);
        if (!user) return null;

        return this.userMapperService.toDTO(user);
    }

    public registerQr = async ({userId, name, url}: {userId: string, name: string, url: string}) => {

        const qrId = this.uuidService.random();
        const qrCodeValue = new QrCodeValue({qrId, userId, name, url});

        return await this.qrCodeRepository.createQrCode(qrCodeValue);
    };
} 

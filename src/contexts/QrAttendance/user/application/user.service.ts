import {UserValue} from '../domain/user.value';

import {EncryptService} from "../../shared/application/services/encrypt.service";
import {UuiService} from "../../shared/application/services/uui.service";
import {UserQuery} from "../domain/user.query";
import {UserMapperService} from "../infraestructure/mappers/user.mapper";
import {UserRepository} from "../infraestructure/repository/userRepository";
import {Either} from "./exceptions/duplicatedEmailError";
import {UserError} from "./exceptions/userError";
import {UserEntity} from "../domain/user.entity";
import {left, right} from "fp-ts/Either";
import {UserDTO} from "./DTOs/userDTO";


export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly encryptService: EncryptService,
        private readonly userMapperService: UserMapperService,
        private readonly uuidService: UuiService
    ) {}

    public findUserById = async (userId: string) => {

        const user = await this.userRepository.findUserById(userId);
        if (!user) return null;

        const mapped = this.userMapperService.toDomain(user);
        return this.userMapperService.toDTO(mapped);
    }

    public registerUser = async ({name, email, password, mothersName, fathersName}: { name: string, email: string, password: string, mothersName: string, fathersName: string }): Promise<Either<UserError, UserDTO>> => {

        // verify if user already exists
        const userExists = await this.userRepository.findUserByEmail(email);
        if (userExists) return left(UserError.DUPLICATED_EMAIL);

        const userId = this.uuidService.random();
        password = await this.encryptService.hash(password);

        const userValue = new UserValue({userId, name, email, password, mothersName, fathersName});
        const persistanceUser = this.userMapperService.toPersistance(userValue);

        await this.userRepository.createUser(persistanceUser);
        return right(this.userMapperService.toDTO(userValue))
    }

    public updateUser = async(fields: UserQuery, userId: string) => {
        const user = await this.userRepository.updateUser(fields, userId);
        if (!user) return;

        const mapped = this.userMapperService.toDomain(user);
        return this.userMapperService.toDTO(mapped);
    }
    public deleteUser = async(userId: string) => {

        const user = await this.userRepository.deleteUser(userId);
        if (!user) return null;

        const mapped = this.userMapperService.toDomain(user);
        return this.userMapperService.toDTO(mapped);
    }

    public findUserByEmail = async (email: string): Promise<Either<UserError, UserEntity>> => {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) return left(UserError.USER_NOT_FOUND);

        return right(this.userMapperService.toDomain(user))
    }
} 

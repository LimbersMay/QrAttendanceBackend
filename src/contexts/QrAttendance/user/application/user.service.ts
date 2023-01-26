import {UserValue} from '../domain/user.value';

import {EncryptService} from "../../shared/application/services/encrypt.service";
import {UUIDGenerator} from "../../shared/application/services/UUIDGenerator";
import {UserQuery} from "../domain/user.query";
import {UserMapperService} from "../infrastructure/mappers/user.mapper";
import {UserRepository} from "../infrastructure/repository/user.repository";
import {UserError} from "./exceptions/userError";
import {UserEntity} from "../domain/user.entity";
import { isRight, left, right} from "fp-ts/Either";
import {UserDTO} from "./entities/userDTO";
import {Either} from "../../../shared/types/ErrorEither";


export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly encryptService: EncryptService,
        private readonly userMapperService: UserMapperService,
        private readonly uuidService: UUIDGenerator
    ) {
    }

    public findUserById = async (userId: string): Promise<Either<UserError, UserDTO>> => {

        const user = await this.userRepository.findUserById(userId);

        return isRight(user)
            ? right(this.userMapperService.toDTO(user.right))
            : left(UserError.NOT_FOUND);
    }

    public registerUser = async ({name, email, password, lastname}: { name: string, email: string, password: string, lastname: string }): Promise<Either<UserError, UserDTO>> => {

        const userId = this.uuidService.random();
        password = await this.encryptService.hash(password);

        const userValue = UserValue.create({
            userId,
            name,
            email,
            password,
            lastname
        })

        const newUser = await this.userRepository.createUser(userValue);
        return isRight(newUser)
            ? right(this.userMapperService.toDTO(newUser.right))
            : left(UserError.DUPLICATED_EMAIL);
    }

    public updateUser = async (fields: UserQuery, userId: string): Promise<Either<UserError, number>> => {
        const result = await this.userRepository.updateUser(fields, userId);

        return isRight(result)
            ? right(result.right)
            : left(UserError.NOT_FOUND);
    }
    public deleteUser = async (userId: string): Promise<Either<UserError, number>> => {

        const rowsDeleted = await this.userRepository.deleteUser(userId);
        return isRight(rowsDeleted)
            ? right(rowsDeleted.right)
            : left(UserError.NOT_FOUND);
    }

    public findUserByEmail = async (email: string): Promise<Either<UserError, UserEntity>> => {

        const user = await this.userRepository.findUserByEmail(email);
        return isRight(user)
            ? right(user.right)
            : left(UserError.NOT_FOUND);
    }
} 

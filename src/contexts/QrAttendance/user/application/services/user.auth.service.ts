import {AuthService} from "./auth.service";
import {EncryptService} from "../../../shared/application/services/encrypt.service";
import {UserRepository} from "../../domain/user.repository";
import {UserEntity} from "../../domain/user.entity";

export class AuthUserService implements AuthService {
    constructor(
        private userRepository: UserRepository,
        private encryptService: EncryptService
    ) {}
    findUserByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findUserBy({email});
    }
    findUserById(id: string): Promise<UserEntity | null> {
        return this.userRepository.findUserById(id);
    }
    async verifyCredentials(email: string, password: string): Promise<Boolean | null> {
        const user = await this.userRepository.findUserBy({email});

        if (user) {
            return this.encryptService.compare(password, user.password);
        }

        return null;
    }
}

import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';

export class UserValue implements UserEntity {
    userId: string;
    email: string;
    password: string;
    name: string;
    mothers_name: string;
    fathers_name: string;

    constructor ({email, password, name, mothers_name, fathers_name}: UserEntity) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.mothers_name = mothers_name;
        this.fathers_name = fathers_name;

        this.userId = uuid();
    }
}

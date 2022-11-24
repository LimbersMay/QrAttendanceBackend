import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';

export class UserValue implements UserEntity {
    userId: string;
    email: string;
    password: string;
    name: string;
    mothersName: string;
    fathersName: string;

    constructor ({email, password, name, mothersName: mothers_name, fathersName: fathers_name}: UserEntity) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.mothersName = mothers_name;
        this.fathersName = fathers_name;

        this.userId = uuid();
    }
}

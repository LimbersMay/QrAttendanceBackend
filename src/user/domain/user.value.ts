import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';

export class UserValue implements UserEntity {
    userId: string;
    email: string;
    password: string;
    name: string;
    mothersName: string;
    fathersName: string;

    constructor ({name, email, password, mothersName, fathersName}: UserEntity) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.mothersName = mothersName;
        this.fathersName = fathersName;

        this.userId = uuid();
    }
}

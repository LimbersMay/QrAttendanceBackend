import { UserEntity } from './user.entity';

export class UserValue implements UserEntity {
    userId: string;
    email: string;
    password: string;
    name: string;
    mothersName: string;
    fathersName: string;
    updatedAt: Date | undefined;
    createdAt: Date | undefined;

    constructor ({userId, name, email, password, mothersName, fathersName, createdAt, updatedAt}: UserEntity) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.mothersName = mothersName;
        this.fathersName = fathersName;

        this.updatedAt = updatedAt ;
        this.createdAt = createdAt;
        this.userId = userId;
    }
}

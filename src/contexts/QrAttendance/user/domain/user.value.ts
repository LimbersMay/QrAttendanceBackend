import { UserEntity } from './user.entity';

export class UserValue implements UserEntity {
    id: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    updatedAt: Date | undefined;
    createdAt: Date | undefined;

    constructor ({id, name, email, password, lastname, createdAt, updatedAt}: UserEntity) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastname = lastname;

        this.updatedAt = updatedAt ;
        this.createdAt = createdAt;
        this.id = id;
    }
}

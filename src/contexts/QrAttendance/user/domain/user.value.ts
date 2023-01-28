import { UserEntity } from './user.entity';

export class UserValue implements UserEntity {
    userId: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    updatedAt: Date | undefined;
    createdAt: Date | undefined;

    constructor ({userId, name, email, password, lastname, createdAt, updatedAt}: UserEntity) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastname = lastname;

        this.updatedAt = updatedAt ;
        this.createdAt = createdAt;
        this.userId = userId;
    }

    public static create(user: UserEntity): UserValue {
        return new UserValue(user);
    }
}

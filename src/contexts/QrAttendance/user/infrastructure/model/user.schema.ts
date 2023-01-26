import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {UserEntity} from "../../domain/user.entity";

@Table({
    tableName: "user"
})
export class User extends Model<UserEntity> {
    @PrimaryKey
    @Unique
    @Column
    userId!: string

    @Column
    name!: string

    @Column
    email!: string

    @Column
    password!: string

    @Column
    lastname!: string
}

export default User;

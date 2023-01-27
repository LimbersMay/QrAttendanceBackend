import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {UserEntity} from "../../domain";
import {DataType} from "sequelize-typescript";
import sequelize from "../../../../shared/infrastructure/db/mysql.connection";

@Table
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

    @Column
    createdAt!: Date

    @Column
    updatedAt!: Date
}

sequelize.addModels([User]);

User.init({
    userId: {
        type: DataType.STRING,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataType.STRING
    },
    email: {
        type: DataType.STRING
    },
    password: {
        type: DataType.STRING
    },
    lastname: {
        type: DataType.STRING
    },
    createdAt: {
        type: DataType.DATE,
    },
    updatedAt: {
        type: DataType.DATE,
    }
}, { sequelize: sequelize, tableName: "user" });

export default User;

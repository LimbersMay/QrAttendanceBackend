import {Column, HasMany, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {UserEntity} from "../../domain";
import Group from "../../../group/infrastructure/model/group.schema";

@Table
export class User extends Model<UserEntity> {
    @PrimaryKey
    @Unique
    @Column
    userId!: string

    @Column
    name!: string

    @Unique
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
    @HasMany(() => Group)
    groups: Group[] = []
}

export default User;

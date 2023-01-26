import {Table, Column, Model, PrimaryKey, Unique, ForeignKey} from "sequelize-typescript";
import {GroupEntity} from "../../domain/group.entity";
import User from "../../../user/infrastructure/model/user.schema";

@Table({
    tableName: "group"
})
class Group extends Model<GroupEntity> {
    @PrimaryKey
    @Unique
    @Column
    groupId!: string;

    @Column
    @ForeignKey(() => User)
    userId!: string;

    @Column
    name!: string;
}

export default Group;

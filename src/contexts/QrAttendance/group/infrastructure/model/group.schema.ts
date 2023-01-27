import {Table, Column, Model, PrimaryKey, Unique, ForeignKey } from "sequelize-typescript";
import {GroupEntity} from "../../domain/group.entity";
import User from "../../../user/infrastructure/model/user.schema";
import sequelize from "../../../../shared/infrastructure/db/mysql.connection";
import {DataType} from "sequelize-typescript";

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
    @Column
    createdAt!: Date;
    @Column
    updatedAt!: Date;
}

const groupAttributes = {
    groupId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

sequelize.addModels([Group]);
Group.init(groupAttributes, {sequelize: sequelize, tableName: "group"});

export default Group;

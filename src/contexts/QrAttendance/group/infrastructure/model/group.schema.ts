import {Table, Column, Model, PrimaryKey, Unique, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import {GroupEntity} from "../../domain";
import User from "../../../user/infrastructure/model/user.schema";
import QrCode from "../../../qr_code/infrastructure/models/qrCode.schema";

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
    @BelongsTo(() => User, {onDelete: 'cascade'})
    user!: User;

    @HasMany(() => QrCode)
    qrCodes: QrCode[] = []
}

export default Group;

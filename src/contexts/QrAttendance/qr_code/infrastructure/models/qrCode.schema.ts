import {Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {QrCodeEntity} from "../../domain/qrCode.entity";
import Group from "../../../group/infrastructure/model/group.schema";
import User from "../../../user/infrastructure/model/user.schema";

@Table({
    tableName: "qrCode"
})
export class QrCode extends Model<QrCodeEntity> {
    @PrimaryKey
    @Unique
    @Column
    qrId!: string;

    @ForeignKey(() => Group)
    @Column
    groupId!: string

    @ForeignKey(() => User)
    @Column
    ownerId!: string

    @Column
    name!: string;

    @Column
    url!: string;
}

export default QrCode;

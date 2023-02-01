import {BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {QrCodeEntity} from "../../domain/qrCode.entity";
import Group from "../../../group/infrastructure/model/group.schema";
import User from "../../../user/infrastructure/model/user.schema";
import Registry from "../../../registry/infrastructure/model/registry.schema";

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
    @BelongsTo(() => Group, {onDelete: "cascade"})
    group!: Group

    @ForeignKey(() => User)
    @Column
    ownerId!: string

    @HasMany(() => Registry)
    registries: Registry[] = []

    @Column
    name!: string;

    @Column
    url!: string;
    @Column
    enabled!: boolean;

    @Column
    manualRegistrationDate!: Date;

    @Column
    createdAt!: Date

    @Column
    updatedAt!: Date
}

export default QrCode;

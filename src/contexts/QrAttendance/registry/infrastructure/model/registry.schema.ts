import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {RegistryEntity} from "../../domain/registry.entity";
import QrCode from "../../../qr_code/infrastructure/models/qrCode.schema";
import User from "../../../user/infrastructure/model/user.schema";

@Table({
    tableName: "registry"
})
export class Registry extends Model<RegistryEntity> {
    @PrimaryKey
    @Unique
    @Column
    registryId!: string;

    @ForeignKey(() => QrCode)
    @Column
    qrId!: string;
    @BelongsTo(() => QrCode, {onDelete: "cascade"})
    qrCode!: QrCode;

    @ForeignKey(() => User)
    @Column
    ownerId!: string;

    @Column
    name!: string;

    @Column
    firstSurname!: string;

    @Column
    secondSurname!: string;

    @Column
    checkinTime!: Date;

    @Column
    createdAt!: Date;
    @Column
    updatedAt!: Date;
}

export default Registry;
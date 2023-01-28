import {Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
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
    qrCodeId!: string;

    @ForeignKey(() => User)
    @Column
    ownerId!: string;

    @Column
    name!: string;

    @Column
    firstSurname!: string;

    @Column
    secondSurname!: string;
}

export default Registry;
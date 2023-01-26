import { RegistryEntity } from "./registry.entity";

export class RegistryValue implements RegistryEntity {
    registryId: string;
    qrCodeId: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
    updatedAt: Date;
    createdAt: Date;
    
    constructor({registryId, qrCodeId, name, firstSurname, secondSurname, createdAt, updatedAt}: RegistryEntity) {
        this.name = name;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;

        this.registryId = registryId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.qrCodeId = qrCodeId;
    }
}

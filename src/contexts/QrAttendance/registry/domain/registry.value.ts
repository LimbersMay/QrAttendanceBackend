import { RegistryEntity } from "./registry.entity";

export class RegistryValue implements RegistryEntity {
    registryId: string;
    qrCodeId: string;
    ownerId: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
    updatedAt: Date;
    createdAt: Date;
    
    constructor({registryId, qrCodeId, ownerId, name, firstSurname, secondSurname, createdAt, updatedAt}: RegistryEntity) {
        this.name = name;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;

        this.registryId = registryId;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.qrCodeId = qrCodeId;
    }

    static fromRegistry(registry: RegistryEntity): RegistryValue {
        return new RegistryValue(registry);
    }
}

import { RegistryEntity } from "./registry.entity";

export class RegistryValue implements RegistryEntity {
    registryId: string;
    qrId: string;
    ownerId: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
    checkinTime?: Date;
    updatedAt?: Date;
    createdAt?: Date;
    
    constructor({registryId, qrId, ownerId, name, firstSurname, secondSurname, checkinTime, createdAt, updatedAt}: RegistryEntity) {
        this.name = name;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;

        this.registryId = registryId;
        this.ownerId = ownerId;
        this.checkinTime = checkinTime;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.qrId = qrId;
    }

    static create(registry: RegistryEntity): RegistryValue {
        return new RegistryValue(registry);
    }
}

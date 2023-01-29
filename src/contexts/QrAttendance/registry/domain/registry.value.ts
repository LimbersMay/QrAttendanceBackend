import { RegistryEntity } from "./registry.entity";

export class RegistryValue implements RegistryEntity {
    registryId: string;
    qrId: string;
    ownerId: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
    updatedAt?: Date;
    createdAt?: Date;
    
    constructor({registryId, qrId, ownerId, name, firstSurname, secondSurname, createdAt, updatedAt}: RegistryEntity) {
        this.name = name;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;

        this.registryId = registryId;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.qrId = qrId;
    }

    static create({registryId, qrId, ownerId, name, firstSurname, secondSurname, createdAt, updatedAt}: RegistryEntity): RegistryValue {
        return new RegistryValue({
            registryId,
            qrId,
            ownerId,
            name,
            firstSurname,
            secondSurname,
            createdAt,
            updatedAt
        });
    }
}

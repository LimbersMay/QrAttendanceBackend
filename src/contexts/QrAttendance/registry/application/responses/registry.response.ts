import {RegistryEntity} from "../../domain/registry.entity";

export class RegistryResponse {
    id: string;
    qrCodeId: string;
    date: Date;
    name: string;
    firstSurname: string;
    secondSurname: string;

    constructor(id: string, qrCodeId: string, date: Date, name: string, firstSurname: string, secondSurname: string) {
        this.id = id;
        this.qrCodeId = qrCodeId;
        this.date = date;
        this.name = name;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;
    }

    static fromRegistryEntity(registryEntity: RegistryEntity): RegistryResponse {
        return new RegistryResponse(
            registryEntity.registryId,
            registryEntity.qrCodeId,
            registryEntity.createdAt,
            registryEntity.name,
            registryEntity.firstSurname,
            registryEntity.secondSurname
        );
    }

    static fromRegistryEntities(registryEntities: RegistryEntity[]): RegistryResponse[] {
        return registryEntities.map(registryEntity => RegistryResponse.fromRegistryEntity(registryEntity));
    }
}


import {RegistryEntity} from "../../domain/registry.entity";

export class RegistryResponse {
    id: string;
    qrCodeId: string;
    date?: Date;
    name: string;
    firstSurname: string;
    secondSurname: string;

    constructor({id, qrCodeId, date, name, firstSurname, secondSurname}: { id: string, qrCodeId: string, date?: Date, name: string, firstSurname: string, secondSurname: string }) {
        this.id = id;
        this.qrCodeId = qrCodeId;
        this.date = date;
        this.name = name;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;
    }

    static fromRegistry(registryEntity: RegistryEntity): RegistryResponse {
        return new RegistryResponse({
            id: registryEntity.registryId,
            qrCodeId: registryEntity.qrCodeId,
            date: registryEntity.createdAt,
            name: registryEntity.name,
            firstSurname: registryEntity.firstSurname,
            secondSurname: registryEntity.secondSurname
        });
    }

    static fromRegistries(registryEntities: RegistryEntity[]): RegistryResponse[] {
        return registryEntities.map(registryEntity => RegistryResponse.fromRegistry(registryEntity));
    }
}


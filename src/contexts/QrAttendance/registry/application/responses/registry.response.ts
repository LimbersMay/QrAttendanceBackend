import {RegistryEntity} from "../../domain/registry.entity";

export class RegistryResponse {
    id: string;
    qrCodeId: string;
    checkinTime?: Date;
    name: string;
    group: string;
    career: string;
    firstSurname: string;
    secondSurname: string;

    constructor({id, qrCodeId, checkinTime, name, group, career, firstSurname, secondSurname}: { id: string, qrCodeId: string, checkinTime?: Date, name: string, group: string, career: string, firstSurname: string, secondSurname: string }) {
        this.id = id;
        this.qrCodeId = qrCodeId;
        this.checkinTime = checkinTime;
        this.name = name;
        this.group = group;
        this.career = career;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;
    }

    static fromRegistry(registryEntity: RegistryEntity): RegistryResponse {
        return new RegistryResponse({
            id: registryEntity.registryId,
            qrCodeId: registryEntity.qrId,
            checkinTime: registryEntity.checkinTime,
            name: registryEntity.name,
            group: registryEntity.group,
            career: registryEntity.career,
            firstSurname: registryEntity.firstSurname,
            secondSurname: registryEntity.secondSurname
        });
    }

    static fromRegistries(registryEntities: RegistryEntity[]): RegistryResponse[] {
        return registryEntities.map(registryEntity => RegistryResponse.fromRegistry(registryEntity));
    }
}


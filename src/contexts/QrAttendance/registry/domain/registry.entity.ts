
export interface RegistryEntity {
    registryId: string,
    qrId: string,
    ownerId: string,
    name: string,
    group: string,
    career: string,
    firstSurname: string,
    secondSurname: string,
    checkinTime?: Date
    createdAt?: Date,
    updatedAt?: Date
}

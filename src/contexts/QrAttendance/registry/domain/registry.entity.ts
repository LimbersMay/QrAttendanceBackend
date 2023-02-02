
export interface RegistryEntity {
    registryId: string,
    qrId: string,
    ownerId: string,
    name: string,
    firstSurname: string,
    secondSurname: string,
    checkinTime?: Date
    createdAt?: Date,
    updatedAt?: Date
}

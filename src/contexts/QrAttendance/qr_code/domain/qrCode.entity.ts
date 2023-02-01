
export interface QrCodeEntity {
    qrId: string,
    groupId: string,
    ownerId: string,
    name: string,
    url: string,
    enabled: boolean,
    manualRegistrationDate?: Date | undefined,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined
}

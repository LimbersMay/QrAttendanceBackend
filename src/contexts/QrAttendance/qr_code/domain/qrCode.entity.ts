
export interface QrCodeEntity {
    qrId: string,
    groupId: string,
    ownerId: string,
    name: string,
    url: string,
    enabled: boolean,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined
}

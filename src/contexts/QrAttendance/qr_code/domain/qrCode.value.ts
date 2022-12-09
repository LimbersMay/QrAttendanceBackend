import {QrCodeEntity} from "./qrCode.entity";

export class QrCodeValue implements QrCodeEntity {
    qrId: string;
    userId: string;
    name: string;
    url: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;

    constructor({qrId, userId, name, url, createdAt, updatedAt}: QrCodeEntity) {
        this.qrId = qrId;
        this.userId = userId;
        this.name = name;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

import {QrCodeEntity} from "./qrCode.entity";

export class QrCodeValue implements QrCodeEntity {
    qrId: string;
    groupId: string;
    ownerId: string;
    name: string;
    url: string;
    formId: string;
    enabled: boolean;
    manualRegistrationDate: Date | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;

    constructor({qrId, groupId, ownerId, name, url, formId, manualRegistrationDate, createdAt, updatedAt, enabled}: QrCodeEntity) {
        this.qrId = qrId;
        this.groupId = groupId;
        this.ownerId = ownerId;
        this.name = name;
        this.url = url;
        this.formId = formId;
        this.enabled = enabled;
        this.manualRegistrationDate = manualRegistrationDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static create = (qrCodeEntity: QrCodeEntity): QrCodeValue => {
        return new QrCodeValue(qrCodeEntity);
    }
}

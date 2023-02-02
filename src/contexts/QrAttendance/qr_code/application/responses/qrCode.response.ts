import {QrCodeEntity} from "../../domain/qrCode.entity";

export class QrCodeResponse {
    id: string;
    groupId: string;
    ownerId: string;
    url: string;
    formId: string;
    name: string;
    enabled: boolean;
    manualRegistrationDate?: Date;

    constructor(id: string, groupId: string, ownerId: string, name: string, url: string, formId: string, enabled: boolean, manualRegistrationDate?: Date) {
        this.id = id;
        this.groupId = groupId;
        this.ownerId = ownerId;
        this.name = name;
        this.url = url;
        this.formId = formId;
        this.manualRegistrationDate = manualRegistrationDate;
        this.enabled = enabled;
    }

    static fromQrCode(qrCode: QrCodeEntity): QrCodeResponse {
        return new QrCodeResponse(qrCode.qrId, qrCode.groupId, qrCode.ownerId, qrCode.name, qrCode.url,qrCode.formId, qrCode.enabled, qrCode.manualRegistrationDate);
    }

    static fromQrCodes(qrCodes: QrCodeEntity[]): QrCodeResponse[] {
        return qrCodes.map(qrCode => QrCodeResponse.fromQrCode(qrCode));
    }
}

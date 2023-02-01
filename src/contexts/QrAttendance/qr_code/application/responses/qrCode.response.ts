import {QrCodeEntity} from "../../domain/qrCode.entity";

export class QrCodeResponse {
    id: string;
    groupId: string;
    name: string;
    enabled: boolean;
    manualRegistrationDate?: Date;

    constructor(id: string, groupId: string, name: string, enabled: boolean, manualRegistrationDate?: Date) {
        this.id = id;
        this.groupId = groupId;
        this.name = name;
        this.manualRegistrationDate = manualRegistrationDate;
        this.enabled = enabled;
    }

    static fromQrCode(qrCode: QrCodeEntity): QrCodeResponse {
        return new QrCodeResponse(qrCode.qrId, qrCode.groupId, qrCode.name, qrCode.enabled, qrCode.manualRegistrationDate);
    }

    static fromQrCodes(qrCodes: QrCodeEntity[]): QrCodeResponse[] {
        return qrCodes.map(qrCode => QrCodeResponse.fromQrCode(qrCode));
    }
}

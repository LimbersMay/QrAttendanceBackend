import {QrCodeEntity} from "../../domain/qrCode.entity";

export class QrCodeResponse {
    id: string;
    name: string;
    enabled: boolean;
    createdAt?: Date;

    constructor(id: string, name: string, enabled: boolean, createdAt?: Date) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.enabled = enabled;
    }

    static fromQrCode(qrCode: QrCodeEntity): QrCodeResponse {
        return new QrCodeResponse(qrCode.qrId, qrCode.name, qrCode.enabled, qrCode.createdAt);
    }

    static fromQrCodes(qrCodes: QrCodeEntity[]): QrCodeResponse[] {
        return qrCodes.map(qrCode => QrCodeResponse.fromQrCode(qrCode));
    }
}

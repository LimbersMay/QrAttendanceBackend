import {QrCodeEntity} from "./qrCode.entity";

export interface QrCodeRepository {
    createQrCode(qrCode: QrCodeEntity): Promise<QrCodeEntity | null>;
    updateQrCode(fields: any, qrCodeId: string): Promise<QrCodeEntity | null>;
    deleteQrCode(qrCodeId: string): Promise<QrCodeEntity | null>;
    findQrCodeById(qrCodeId: string): Promise<QrCodeEntity | null>
}

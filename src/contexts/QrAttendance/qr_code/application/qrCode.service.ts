import {QrCodeRepository} from "../domain/qrCode.repository";
import {QrCodeEntity} from "../domain/qrCode.entity";

export class QrCodeService implements QrCodeRepository {
    createQrCode(qrCode: QrCodeEntity): Promise<QrCodeEntity | null> {
        throw new Error("Not implemented");
    }

    deleteQrCode(qrCodeId: string): Promise<QrCodeEntity | null> {
        throw new Error("Not implemented");
    }

    updateQrCode(fields: any, qrCodeId: string): Promise<QrCodeEntity | null> {
        throw new Error("Not implemented");
    }

    findQrCodeById(qrCodeId: string): Promise<QrCodeEntity | null> {
        throw new Error("Not implemented");
    }

}

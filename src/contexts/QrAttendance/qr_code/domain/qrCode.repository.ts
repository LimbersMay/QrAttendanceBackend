import {QrCodeEntity} from "./qrCode.entity";
import {Either} from "../../shared/interfaces/ErrorEither";
import {QrCodeError} from "./errors/qrCode.errors";

export interface QrCodeRepository {
    createQrCode(qrCode: QrCodeEntity): Promise<QrCodeEntity>;
    updateQrCode(fields: any, qrCodeId: string, userId: string): Promise<Either<QrCodeError, number>>;
    deleteQrCode(qrCodeId: string, userId: string): Promise<Either<QrCodeError, number>>;
    findQrCodeById(qrCodeId: string, userId: string): Promise<Either<QrCodeError, QrCodeEntity>>
    findQrCodeByUserId(userId: string): Promise<Either<QrCodeError, QrCodeEntity[]>>
    findByFormId(formId: string): Promise<Either<QrCodeError, QrCodeEntity>>
}

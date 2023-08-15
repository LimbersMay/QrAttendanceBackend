import {Criteria, Either} from "../../shared";
import {QrCodeError, QrCodeEntity, QrCodeQuery} from "./";

export interface QrCodeRepository {
    findAll(specifications: Criteria): Promise<QrCodeEntity[]>
    findOne(specifications: Criteria): Promise<Either<QrCodeError, QrCodeEntity>>
    createQrCode(qrCode: QrCodeEntity): Promise<QrCodeEntity>;
    updateQrCode(fields: QrCodeQuery, specifications: Criteria): Promise<Either<QrCodeError, number>>;
    deleteQrCode(specifications: Criteria): Promise<Either<QrCodeError, number>>;
}

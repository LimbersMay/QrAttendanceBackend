import {QrCodeRepository} from "../../../domain/qrCode.repository";
import {Either} from "../../../../../shared/types/ErrorEither";
import {QrCodeError} from "../../../domain/errors/qrCode.errors";
import {QrCodeResponse} from "../../responses/qrCode.response";
import {isRight, left, right} from "fp-ts/Either";

export class QrCodeFinder {
    constructor(
        private readonly qrCodeRepository: QrCodeRepository
    ) {
    }

    public execute = async (id: string, userId: string): Promise<Either<QrCodeError, QrCodeResponse>> => {

        return this.qrCodeRepository.findQrCodeById(id, userId).then(qrCode => {

            return isRight(qrCode)
                ? right(QrCodeResponse.fromQrCode(qrCode.right))
                : left(QrCodeError.QR_CODE_NOT_FOUND);

        }).catch(() => left(QrCodeError.QR_CODE_CANNOT_BE_FOUND));
    }

    public executeByUserId = async (userId: string): Promise<Either<QrCodeError, QrCodeResponse[]>> => {
        return this.qrCodeRepository.findQrCodeByUserId(userId).then(qrCodes => {

            return isRight(qrCodes)
                ? right(QrCodeResponse.fromQrCodes(qrCodes.right))
                : left(QrCodeError.QR_CODE_NOT_FOUND);

        }).catch(() => left(QrCodeError.QR_CODE_CANNOT_BE_FOUND));
    }
}

import {inject, injectable} from "inversify";
import {isRight, left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/qrCode/types";
import {QrCodeRepository} from "../../../domain/qrCode.repository";
import {Either} from "../../../../../shared/types/ErrorEither";
import {QrCodeError} from "../../../domain/errors/qrCode.errors";

@injectable()
export class QrCodeDeleter {
    constructor(
        @inject(TYPES.QrCodeRepository) private qrCodeRepository: QrCodeRepository,
    ){}

    async execute(id: string, userId: string): Promise<Either<QrCodeError, number>> {

        return this.qrCodeRepository.deleteQrCode(id, userId).then(result => {

            return isRight(result)
                ? right(result.right)
                : left(QrCodeError.QR_CODE_NOT_FOUND);

        }).catch(() => left(QrCodeError.QR_CODE_CANNOT_BE_DELETED));
    }
}

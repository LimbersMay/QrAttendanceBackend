import {QrCodeRepository} from "../../../domain/qrCode.repository";
import {Either} from "../../../../../shared/types/ErrorEither";
import {QrCodeError} from "../../../domain/errors/qrCode.errors";
import {GroupQuery} from "../../../../group/domain/group.query";
import {isRight, left, right} from "fp-ts/Either";

export class QrCodeUpdater {
    constructor(
        private readonly qrCodeRepository: QrCodeRepository,
    ) {}

    public execute = async(fields: GroupQuery, qrCodeId: string, userId: string): Promise<Either<QrCodeError, number>> => {

        return this.qrCodeRepository.updateQrCode(fields, qrCodeId, userId).then(result => {

            return isRight(result)
                ? right(result.right)
                : left(QrCodeError.QR_CODE_NOT_FOUND);

        }).catch(() => left(QrCodeError.QR_CODE_CANNOT_BE_UPDATED));
    }
}

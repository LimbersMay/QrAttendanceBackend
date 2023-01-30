import {inject, injectable} from "inversify";
import {isRight, left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/qrCode/types";
import {QrCodeRepository} from "../../../domain/qrCode.repository";
import {Either} from "../../../../../shared/types/ErrorEither";
import {QrCodeError} from "../../../domain/errors/qrCode.errors";
import {GroupQuery} from "../../../../group/domain/group.query";

@injectable()
export class QrCodeUpdater {
    constructor(
        @inject(TYPES.QrCodeRepository) private qrCodeRepository: QrCodeRepository,
    ) {}

    public execute = async(fields: GroupQuery, qrCodeId: string, userId: string): Promise<Either<QrCodeError, number>> => {

        return this.qrCodeRepository.updateQrCode(fields, qrCodeId, userId).then(result => {

            return isRight(result)
                ? right(result.right)
                : left(QrCodeError.QR_CODE_NOT_FOUND);

        }).catch(() => left(QrCodeError.QR_CODE_CANNOT_BE_UPDATED));
    }
}

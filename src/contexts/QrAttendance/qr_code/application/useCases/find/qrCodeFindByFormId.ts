import {QrCodeRepository} from "../../../domain/qrCode.repository";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/qrCode/types";
import {Either} from "../../../../../shared/types/ErrorEither";
import {QrCodeError} from "../../../domain/errors/qrCode.errors";
import {QrCodeResponse} from "../../responses/qrCode.response";
import {isRight, left, right} from "fp-ts/Either";

@injectable()
export class QrCodeFindByFormId {

    constructor(
        @inject(TYPES.QrCodeRepository) private qrCodeRepository: QrCodeRepository
    ) {}

    public async execute(formId: string): Promise<Either<QrCodeError, QrCodeResponse>> {
        return this.qrCodeRepository.findByFormId(formId).then(qrCode => {
            return isRight(qrCode)
                ? right(QrCodeResponse.fromQrCode(qrCode.right))
                : left(QrCodeError.FORM_DESATIVATED_BY_THE_TEACHER);

        }).catch(() => left(QrCodeError.QR_CODE_CANNOT_BE_FOUND));
    }
}

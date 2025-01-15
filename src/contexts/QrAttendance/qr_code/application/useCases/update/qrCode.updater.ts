import {inject, injectable} from "inversify";
import {fold, left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/qrCode/types";
import {Criteria, Either} from "../../../../shared";
import {QrCodeError, QrCodeQuery, QrCodeRepository} from "../../../domain";

@injectable()
export class QrCodeUpdater {
    constructor(
        @inject(TYPES.QrCodeRepository) private qrCodeRepository: QrCodeRepository,
    ) {}

    public async execute(fields: QrCodeQuery, specifications: Criteria): Promise<Either<QrCodeError, number>> {

        try {
            const result = await this.qrCodeRepository.updateQrCode(fields, specifications);

            return fold(
                () => left(QrCodeError.QR_CODE_NOT_FOUND),
                (rowsUpdated: number) => right(rowsUpdated)
            )(result);

        } catch (error) {
            console.log(error);
            return left(QrCodeError.QR_CODE_CANNOT_BE_UPDATED);
        }
    }
}

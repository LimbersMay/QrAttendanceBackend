import {inject, injectable} from "inversify";
import {fold, left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/qrCode/types";
import {Criteria, Either} from "../../../../shared";
import {QrCodeRepository, QrCodeError} from "../../../domain";

@injectable()
export class QrCodeDeleter {
    constructor(
        @inject(TYPES.QrCodeRepository) private qrCodeRepository: QrCodeRepository,
    ){}

    async execute(specifications: Criteria): Promise<Either<QrCodeError, number>> {

        try {
            const result = await this.qrCodeRepository.deleteQrCode(specifications);

            return fold(
                () => left(QrCodeError.QR_CODE_NOT_FOUND),
                (rowsDeleted: number) => right(rowsDeleted)
            )(result);

        } catch (error) {
            console.log(error);
            return left(QrCodeError.QR_CODE_CANNOT_BE_DELETED);
        }
    }
}

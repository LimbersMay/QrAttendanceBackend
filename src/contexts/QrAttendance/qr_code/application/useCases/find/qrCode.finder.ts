import {inject, injectable} from "inversify";
import {fold, left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/qrCode/types";
import {Criteria, Either} from "../../../../shared";
import {QrCodeResponse} from "../../responses";
import {QrCodeEntity, QrCodeError, QrCodeRepository} from "../../../domain";

@injectable()
export class QrCodeFinder {
    constructor(
        @inject(TYPES.QrCodeRepository) private qrCodeRepository: QrCodeRepository
    ) {}

    public async findOne(specifications: Criteria): Promise<Either<QrCodeError, QrCodeResponse>> {
        try {
            const qrCode = await this.qrCodeRepository.findOne(specifications);

            return fold(
                () => left(QrCodeError.QR_CODE_NOT_FOUND),
                (qrCode: QrCodeEntity) => right(QrCodeResponse.fromQrCode(qrCode))
            )(qrCode);

        } catch (error) {
            console.log(error);
            return left(QrCodeError.QR_CODE_CANNOT_BE_FOUND);
        }
    }

    public async findAll(specifications: Criteria): Promise<Either<QrCodeError, QrCodeResponse[]>> {

        try {
            const qrCodes = await this.qrCodeRepository.findAll(specifications);
            return right(QrCodeResponse.fromQrCodes(qrCodes));
        } catch (error){
            console.log(error)
            return left(QrCodeError.QR_CODES_CANNOT_BE_FOUND);
        }
    }
}

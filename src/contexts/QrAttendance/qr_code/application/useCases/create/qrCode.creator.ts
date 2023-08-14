import {inject, injectable} from "inversify";
import {left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/qrCode/types";
import {Either, UUIDGenerator} from "../../../../shared";
import {QrCodeResponse} from "../../responses";
import {QrCodeError, QrCodeRepository, QrCodeValue} from "../../../domain";


@injectable()
export class QrCodeCreator {
    constructor(
        @inject(TYPES.QrCodeRepository) private qrCodeRepository: QrCodeRepository,
        @inject(TYPES.QrCodeUUIDGenerator) private readonly uuidGenerator: UUIDGenerator
    ){}

    public execute = async (name: string, groupId: string, userId: string, enabled: boolean, url: string, manualRegistrationDate: Date): Promise<Either<QrCodeError, QrCodeResponse>> => {

        const qrCodeValue = QrCodeValue.create({
            qrId: this.uuidGenerator.random(),
            groupId,
            ownerId: userId,
            name,
            url,
            formId: this.uuidGenerator.random(),
            enabled,
            manualRegistrationDate
        });

        try {
            const result = await this.qrCodeRepository.createQrCode(qrCodeValue);
            return right(QrCodeResponse.fromQrCode(result));

        } catch (error){
            console.log(error)
            return left(QrCodeError.QR_CODE_CANNOT_BE_CREATED);
        }
    }
}

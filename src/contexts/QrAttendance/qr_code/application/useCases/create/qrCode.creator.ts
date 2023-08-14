import {inject, injectable} from "inversify";
import {left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/qrCode/types";
import {Either, UUIDGenerator} from "../../../../shared";
import {QrCodeRepository} from "../../../domain/qrCode.repository";
import {QrCodeError} from "../../../domain/errors/qrCode.errors";
import {QrCodeResponse} from "../../responses/qrCode.response";
import {QrCodeValue} from "../../../domain/qrCode.value";

@injectable()
export class QrCodeCreator {
    constructor(
        @inject(TYPES.QrCodeRepository) private qrCodeRepository: QrCodeRepository,
        @inject(TYPES.QrCodeUUIDGenerator) private readonly uuidGenerator: UUIDGenerator
    ){}

    public execute = (name: string, groupId: string, userId: string, enabled: boolean, url: string, manualRegistrationDate: Date): Promise<Either<QrCodeError, QrCodeResponse>> => {

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

        return this.qrCodeRepository.createQrCode(qrCodeValue).then(qrCode => {
            return right(QrCodeResponse.fromQrCode(qrCode));
        }).catch(() => left(QrCodeError.QR_CODE_CANNOT_BE_CREATED));
    }
}

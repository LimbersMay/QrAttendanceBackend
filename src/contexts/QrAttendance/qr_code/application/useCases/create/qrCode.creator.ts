import {QrCodeRepository} from "../../../domain/qrCode.repository";
import {Either} from "../../../../../shared/types/ErrorEither";
import {QrCodeError} from "../../../domain/errors/qrCode.errors";
import {QrCodeResponse} from "../../responses/qrCode.response";
import {QrCodeValue} from "../../../domain/qrCode.value";
import {UUIDGenerator} from "../../../../shared/application/services/UUIDGenerator";
import {left, right} from "fp-ts/Either";

export class QrCodeCreator {
    constructor(
        private readonly qrCodeRepository: QrCodeRepository,
        private readonly uuidGenerator: UUIDGenerator
    ){}

    public execute = (name: string, groupId: string, userId: string, enabled: boolean): Promise<Either<QrCodeError, QrCodeResponse>> => {

        const qrCodeValue = QrCodeValue.create({
            qrId: this.uuidGenerator.random(),
            groupId: groupId,
            ownerId: userId,
            name: name,
            url: '',
            enabled: enabled
        });

        return this.qrCodeRepository.createQrCode(qrCodeValue).then(qrCode => {
            return right(QrCodeResponse.fromQrCode(qrCode));
        }).catch(() => left(QrCodeError.QR_CODE_CANNOT_BE_CREATED));
    }
}

import {inject, injectable} from "inversify";
import {left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/qrCode/types";
import {Either, UUIDGenerator} from "../../../../shared";
import {QrCodeResponse} from "../../responses";
import {QrCodeError, QrCodeRepository, QrCodeValue} from "../../../domain";
import {CreateQrCodeDTO} from "../../validations/qrCode.create";


@injectable()
export class QrCodeCreator {
    constructor(
        @inject(TYPES.QrCodeRepository) private qrCodeRepository: QrCodeRepository,
        @inject(TYPES.QrCodeUUIDGenerator) private readonly uuidGenerator: UUIDGenerator
    ){}

    public async execute (qrCodeDTO: CreateQrCodeDTO, userId: string): Promise<Either<QrCodeError, QrCodeResponse>> {

        const qrCodeValue = QrCodeValue.create({
            ...qrCodeDTO,
            qrId: this.uuidGenerator.random(),
            ownerId: userId,
            formId: this.uuidGenerator.random(),
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

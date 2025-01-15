import {AbstractSpecification, Expression} from "../../../shared";
import {QrCodeEntity} from "../qrCode.entity";

export class QrCodeIdSpecification extends AbstractSpecification<QrCodeEntity> {
    public readonly value: string;

    constructor(value: string) {
        super();
        this.value = value;
    }

    isSatisfiedBy(candidate: QrCodeEntity): boolean {
        return candidate.qrId === this.value;
    }

    convertToExpression(): Expression<QrCodeEntity> {
        return { qrId: this.value }
    }
}
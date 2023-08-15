import {AbstractSpecification, Expression} from "../../../shared";
import {QrCodeEntity} from "../qrCode.entity";

export class FormIdSpecification extends AbstractSpecification<QrCodeEntity> {

    public readonly value: string;

    constructor(value: string) {
        super();
        this.value = value;
    }

    isSatisfiedBy(candidate: QrCodeEntity): boolean {
        return candidate.formId == this.value;
    }

    convertToExpression(): Expression<QrCodeEntity> {
        return { formId: this.value }
    }
}

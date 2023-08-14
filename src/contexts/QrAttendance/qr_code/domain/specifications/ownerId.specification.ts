import {AbstractSpecification, Expression} from "../../../shared";
import {QrCodeEntity} from "../";

export class OwnerIdSpecification extends AbstractSpecification<QrCodeEntity> {

    public readonly value: string;

    constructor(value: string) {
        super();
        this.value = value;
    }

    isSatisfiedBy(candidate: QrCodeEntity): boolean {
        return candidate.ownerId === this.value;
    }

    convertToExpression(): Expression<QrCodeEntity> {
        return {ownerId: this.value};
    }

}

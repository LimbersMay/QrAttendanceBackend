import {AbstractSpecification, Expression} from "../../../shared";
import {RegistryEntity} from "../";

export class OwnerIdSpecification extends AbstractSpecification<RegistryEntity> {

    public readonly value: string;

    constructor(value: string) {
        super();
        this.value = value;
    }

    isSatisfiedBy(candidate: RegistryEntity): boolean {
        return candidate.ownerId === this.value;
    }

    convertToExpression(): Expression<RegistryEntity> {
        return {ownerId: this.value};
    }
}

import {AbstractSpecification, Expression} from "../../../shared";
import {RegistryEntity} from "../registry.entity";

export class RegistryIdSpecification extends AbstractSpecification<RegistryEntity> {

    public readonly value: string;

    constructor(value: string) {
        super();
        this.value = value;
    }

    isSatisfiedBy(candidate: RegistryEntity): boolean {
        return candidate.registryId === this.value
    }

    convertToExpression(): Expression<RegistryEntity> {
        return { registryId: this.value };
    }
}

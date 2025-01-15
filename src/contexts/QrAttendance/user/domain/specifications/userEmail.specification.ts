import {AbstractSpecification, Expression} from "../../../shared";
import {UserEntity} from "../user.entity";

export class UserEmailSpecification extends AbstractSpecification<UserEntity> {
    public readonly value: string;

    public constructor(email: string) {
        super();
        this.value = email;
    }

    public isSatisfiedBy(candidate: UserEntity): boolean {
        return candidate.email === this.value;
    }

    public convertToExpression(): Expression<UserEntity> {
        return { email: this.value };
    }
}
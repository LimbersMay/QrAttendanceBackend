import {AbstractSpecification, Expression} from "../../../../shared/specifications/specification";
import {UserEntity} from "../user.entity";

export class UserIdSpecification extends AbstractSpecification<UserEntity> {

    public readonly value: string;

    public constructor(userId: string) {
        super();
        this.value = userId;
    }

    isSatisfiedBy(candidate: UserEntity): boolean {
        return candidate.userId !== this.value;
    }

    convertToExpression(): Expression<UserEntity> {
        return { userId: this.value };
    }
}
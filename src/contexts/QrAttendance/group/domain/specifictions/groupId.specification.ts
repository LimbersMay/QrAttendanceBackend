import {AbstractSpecification, Expression} from "../../../../shared/specifications/specification";
import {GroupEntity} from "../group.entity";

export class GroupIdSpecification extends AbstractSpecification<GroupEntity> {
    public readonly value: string;

    public constructor(groupId: string) {
        super();
        this.value = groupId;
    }

    public isSatisfiedBy(candidate: GroupEntity): boolean {
        return candidate.groupId === this.value;
    }

    public convertToExpression(): Expression<GroupEntity> {
        return { groupId: this.value };
    }
}
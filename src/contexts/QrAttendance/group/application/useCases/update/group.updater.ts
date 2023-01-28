import {GroupRepository} from "../../../domain/group.repository";
import {GroupError} from "../../errors/group.errors";
import {Either} from "../../../../../shared/types/ErrorEither";
import {isRight, left, right} from "fp-ts/Either";
import {GroupQuery} from "../../../domain/group.query";

export class GroupUpdater {
    constructor(
        private readonly groupRepository: GroupRepository
    ) {}

    execute = (groupId: string, userId: string, fields: GroupQuery): Promise<Either<GroupError, number>> => {
        return this.groupRepository.updateGroup(groupId, userId, fields).then(group => {
            return isRight(group)
                ? right(group.right)
                : left(GroupError.GROUP_NOT_FOUND);

        }).catch(() => left(GroupError.GROUP_CANNOT_BE_UPDATED));
    }
}

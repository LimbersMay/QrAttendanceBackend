import {Either} from "../../../../../shared/types/ErrorEither";
import {GroupError} from "../../errors/group.errors";
import {GroupRepository} from "../../../domain/group.repository";
import {isRight, left, right} from "fp-ts/Either";
import {GroupResponse} from "../../responses/group.response";

export class GroupFinder {
    constructor(
        private readonly groupRepository: GroupRepository
    ) {}

    execute = (groupId: string, userId: string): Promise<Either<GroupError, GroupResponse>> => {
        return this.groupRepository.findGroupById(groupId, userId).then(group => {
            return isRight(group)
                ? right(GroupResponse.fromGroup(group.right))
                : left(GroupError.GROUP_NOT_FOUND);

        }).catch(() => left(GroupError.GROUP_CANNOT_BE_FOUND));
    }

    executeByUserId = (userId: string): Promise<Either<GroupError, GroupResponse[]>> => {
        return this.groupRepository.findGroupsByUserId(userId).then(groups => {

            return isRight(groups)
                ? right(GroupResponse.fromGroups(groups.right))
                : left(GroupError.GROUP_NOT_FOUND);

        }).catch(() => left(GroupError.GROUP_CANNOT_BE_FOUND));
    }
}

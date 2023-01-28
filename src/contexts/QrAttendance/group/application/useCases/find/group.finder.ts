import {Either} from "../../../../../shared/types/ErrorEither";
import {GroupError} from "../../errors/group.errors";
import {GroupRepository} from "../../../domain/group.repository";
import {left, right, fold} from "fp-ts/Either";
import {GroupResponse} from "../../responses/group.response";
import {GroupEntity} from "../../../domain/group.entity";

export class GroupFinder {
    constructor(
        private readonly groupRepository: GroupRepository
    ) {}

    execute = (groupId: string, userId: string): Promise<Either<GroupError, GroupResponse>> => {
        return this.groupRepository.findGroupById(groupId, userId).then(group => {
            return fold(
                (error: GroupError) => left(error),
                (group: GroupEntity) => right(GroupResponse.fromGroup(group))
            )(group);

        }).catch(() => left(GroupError.GROUP_CANNOT_BE_FOUND));
    }

    executeByUserId = (userId: string): Promise<Either<GroupError, GroupResponse[]>> => {
        return this.groupRepository.findGroupsByUserId(userId).then(groups => {
            return fold(
                (error: GroupError) => left(error),
                (groups: GroupEntity[]) => right(GroupResponse.fromGroups(groups))
            )(groups);

        }).catch(() => left(GroupError.GROUP_CANNOT_BE_FOUND));
    }
}

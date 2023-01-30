import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/group/types";
import {left, right, fold} from "fp-ts/Either";
import {Either} from "../../../../../shared/types/ErrorEither";
import {GroupError} from "../../errors/group.errors";
import {GroupRepository} from "../../../domain/group.repository";
import {GroupResponse} from "../../responses/group.response";
import {GroupEntity} from "../../../domain/group.entity";

@injectable()
export class GroupFinder {
    constructor(
        @inject(TYPES.GroupRepository) private groupRepository: GroupRepository
    ) {}

    execute = (groupId: string, userId: string): Promise<Either<GroupError, GroupResponse>> => {
        return this.groupRepository.findGroupById(groupId, userId).then(group => {
            return fold(
                () => left(GroupError.GROUP_NOT_FOUND),
                (group: GroupEntity) => right(GroupResponse.fromGroup(group))
            )(group);

        }).catch(() => left(GroupError.GROUP_CANNOT_BE_FOUND));
    }

    executeByUserId = (userId: string): Promise<Either<GroupError, GroupResponse[]>> => {
        return this.groupRepository.findGroupsByUserId(userId).then(groups => {
            return fold(
                () => left(GroupError.GROUP_NOT_FOUND),
                (groups: GroupEntity[]) => right(GroupResponse.fromGroups(groups))
            )(groups);

        }).catch(() => left(GroupError.GROUP_CANNOT_BE_FOUND));
    }
}

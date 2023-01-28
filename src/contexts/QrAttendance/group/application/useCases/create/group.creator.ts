import {GroupEntity} from "../../../domain/group.entity";
import {GroupError} from "../../errors/group.errors";
import {Either} from "../../../../../shared/types/ErrorEither";
import {GroupRepository} from "../../../domain/group.repository";
import {GroupResponse} from "../../responses/group.response";
import {isRight, left, right} from "fp-ts/Either";

export class GroupCreator {
    constructor(
        private readonly groupRepository: GroupRepository
    ) {}

    execute = (group: GroupEntity): Promise<Either<GroupError, GroupResponse>> => {
        return this.groupRepository.createGroup(group).then(group => {
            return isRight(group)
                ? right(GroupResponse.fromGroup(group.right))
                : left(GroupError.GROUP_NOT_FOUND);

        }).catch(() => left(GroupError.GROUP_CANNOT_BE_CREATED));
    }
}

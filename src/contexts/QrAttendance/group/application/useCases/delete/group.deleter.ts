import {GroupRepository} from "../../../domain/group.repository";
import {Either} from "../../../../../shared/types/ErrorEither";
import {GroupError} from "../../errors/group.errors";
import {isRight, left, right} from "fp-ts/Either";

export class GroupDeleter {

    constructor(
        private readonly groupRepository: GroupRepository,
    ) {}

    execute = (id: string, userId: string): Promise<Either<GroupError, number>> => {
        return this.groupRepository.deleteGroup(id, userId).then(group => {
            return isRight(group)
                ? right(group.right)
                : left(GroupError.GROUP_NOT_FOUND);

        }).catch(() => left(GroupError.GROUP_CANNOT_BE_DELETED));
    }
}

import {inject, injectable} from "inversify";
import {GroupRepository} from "../../../domain/group.repository";
import {GroupError} from "../../errors/group.errors";
import {Either} from "../../../../../shared/types/ErrorEither";
import {left, right, fold} from "fp-ts/Either";
import {GroupQuery} from "../../../domain/group.query";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/group/types";

@injectable()
export class GroupUpdater {
    constructor(
        @inject(TYPES.GroupRepository) private groupRepository: GroupRepository
    ) {}

    execute = (groupId: string, userId: string, fields: GroupQuery): Promise<Either<GroupError, number>> => {
        return this.groupRepository.updateGroup(groupId, userId, fields).then(group => {
            return fold(
                () => left(GroupError.GROUP_NOT_FOUND),
                (group: number) => right(group)
            )(group);

        }).catch(() => left(GroupError.GROUP_CANNOT_BE_UPDATED));
    }
}

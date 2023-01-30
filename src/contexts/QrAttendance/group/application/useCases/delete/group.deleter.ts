import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/group/types";
import {GroupRepository} from "../../../domain/group.repository";
import {Either} from "../../../../../shared/types/ErrorEither";
import {GroupError} from "../../errors/group.errors";
import {left, right, fold} from "fp-ts/Either";

@injectable()
export class GroupDeleter {

    constructor(
        @inject(TYPES.GroupRepository) private groupRepository: GroupRepository,
    ) {}

    execute = (id: string, userId: string): Promise<Either<GroupError, number>> => {
        return this.groupRepository.deleteGroup(id, userId).then(group => {
            return fold(
                () => left(GroupError.GROUP_NOT_FOUND),
                (group: number) => right(group)
            )(group);

        }).catch(() => left(GroupError.GROUP_CANNOT_BE_DELETED));
    }
}

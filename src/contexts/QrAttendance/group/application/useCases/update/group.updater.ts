import {inject, injectable} from "inversify";
import {left, right, fold} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/group/types";
import {Either} from "../../../../../shared/types/ErrorEither";
import {Criteria} from "../../../../../shared/specifications/specification";
import {GroupQuery, GroupError, GroupRepository} from "../../../domain";

@injectable()
export class GroupUpdater {
    constructor(
        @inject(TYPES.GroupRepository) private groupRepository: GroupRepository
    ) {}

    public async execute (fields: GroupQuery, specifications: Criteria): Promise<Either<GroupError, number>> {
        try {
            const group = await this.groupRepository.updateGroup(specifications, fields);
            return fold(
                () => left(GroupError.GROUP_NOT_FOUND),
                (updatedFields: number) => right(updatedFields)
            )(group);
        } catch {
            return left(GroupError.GROUP_CANNOT_BE_UPDATED);
        }
    }
}

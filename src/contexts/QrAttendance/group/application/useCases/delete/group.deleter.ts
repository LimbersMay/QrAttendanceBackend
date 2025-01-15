import {inject, injectable} from "inversify";
import {left, right, fold} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/group/types";
import {Either, Criteria} from "../../../../shared";
import {GroupError, GroupRepository} from "../../../domain";

@injectable()
export class GroupDeleter {

    constructor(
        @inject(TYPES.GroupRepository) private groupRepository: GroupRepository,
    ) {}

    public async execute (specifications: Criteria): Promise<Either<GroupError, number>> {
        try {
            const group = await this.groupRepository.deleteGroup(specifications);
            return fold(
                () => left(GroupError.GROUP_NOT_FOUND),
                (updatedFields: number) => right(updatedFields)
            )(group);
        } catch {
            return left(GroupError.GROUP_CANNOT_BE_DELETED);
        }
    }
}

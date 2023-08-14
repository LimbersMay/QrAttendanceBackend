import {inject, injectable} from "inversify";
import {left, right, fold} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/group/types";
import {Either} from "../../../../../shared/types/ErrorEither";
import {Criteria} from "../../../../../shared/specifications/specification";
import {GroupResponse} from "../../responses";
import {GroupEntity, GroupError, GroupRepository} from "../../../domain";

@injectable()
export class GroupFinder {
    constructor(
        @inject(TYPES.GroupRepository) private groupRepository: GroupRepository
    ) {}


    public async findOne (specifications: Criteria): Promise<Either<GroupError, GroupResponse>> {
        try {
            const group = await this.groupRepository.findOne(specifications);
            return fold(
                () => left(GroupError.GROUP_NOT_FOUND),
                (group: GroupEntity) => right(GroupResponse.fromGroup(group))
            )(group);
        } catch {
            return left(GroupError.GROUP_CANNOT_BE_FOUND);
        }
    }

    public async findAll (specifications: Criteria): Promise<Either<GroupError, GroupResponse[]>> {
        try {
            const group = await this.groupRepository.findAll(specifications);
            return fold(
                () => left(GroupError.GROUP_NOT_FOUND),
                (groups: GroupEntity[]) => right(GroupResponse.fromGroups(groups))
            )(group);
        } catch {
            return left(GroupError.GROUPS_CANNOT_BE_FOUND);
        }
    }
}

import {inject, injectable} from "inversify";
import { left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/group/types";
import {Either} from "../../../../../shared/types/ErrorEither";
import {UUIDGenerator} from "../../../../shared";
import {GroupError, GroupRepository, GroupValue} from "../../../domain";
import {GroupResponse} from "../../responses";

@injectable()
export class GroupCreator {
    constructor(
        @inject(TYPES.GroupRepository) private groupRepository: GroupRepository,
        @inject(TYPES.GroupUUIDGenerator) private UUIDGenerator: UUIDGenerator
    ) {}

    public async execute (name: string, userId: string): Promise<Either<GroupError, GroupResponse>> {

        const group = GroupValue.create({
            groupId: this.UUIDGenerator.random(),
            name,
            userId
        });

        try {
            const result = await this.groupRepository.createGroup(group);
            return right(GroupResponse.fromGroup(result));
        } catch {
            return left(GroupError.GROUP_CANNOT_BE_CREATED);
        }
    }
}

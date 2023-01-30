import {inject, injectable} from "inversify";
import {TYPES} from "../../../../../../apps/QrAttendance/dependency-injection/group/types";
import { left, right} from "fp-ts/Either";
import {GroupError} from "../../errors/group.errors";
import {Either} from "../../../../../shared/types/ErrorEither";
import {GroupRepository} from "../../../domain/group.repository";
import {GroupResponse} from "../../responses/group.response";
import {GroupValue} from "../../../domain/group.value";
import {UUIDGenerator} from "../../../../shared/application/services/UUIDGenerator";

@injectable()
export class GroupCreator {
    constructor(
        @inject(TYPES.GroupRepository) private groupRepository: GroupRepository,
        @inject(TYPES.GroupUUIDGenerator) private UUIDGenerator: UUIDGenerator
    ) {}

    execute = (name: string, userId: string): Promise<Either<GroupError, GroupResponse>> => {

        const group = GroupValue.create({
            groupId: this.UUIDGenerator.random(),
            name,
            userId
        });

        return this.groupRepository.createGroup(group).then(group => {
            return right(GroupResponse.fromGroup(group));
        }).catch(() => left(GroupError.GROUP_CANNOT_BE_CREATED));
    }
}

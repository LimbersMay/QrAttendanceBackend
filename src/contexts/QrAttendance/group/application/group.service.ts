import {GroupRepository} from "../infraestructure/repository";
import {UUIDGenerator} from "../../shared/application/services/UUIDGenerator";
import {Either} from "../../../shared/types/ErrorEither";
import {GroupEntity} from "../domain/group.entity";
import {GroupError} from "./errors/group.errors";
import {GroupValue} from "../domain/group.value";
import {left, right} from "fp-ts/Either";
import {GroupMapper} from "../infraestructure/mappers";

export class GroupService {

    constructor(
        private readonly groupRepository: GroupRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly groupMapper: GroupMapper
    ) {
    }

    createGroup = async (name: string, userId: string): Promise<Either<GroupError, GroupEntity>> => {
        const group = GroupValue.create({
            groupId: this.uuidGenerator.random(),
            userId,
            name,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const groupPersistance = this.groupMapper.toPersistance(group);

        const newGroup = await this.groupRepository.createGroup(groupPersistance);
        if (!newGroup) return left(GroupError.GROUP_NOT_CREATED);

        const mapped = this.groupMapper.toDTO(group);

        return right(mapped);
    }

    getGroupsByUserId = async (userId: string): Promise<Either<GroupError, GroupEntity[]>> => {

        const groups = await this.groupRepository.findGroupsByUserId(userId);
        if (!groups) return left(GroupError.CANNOT_GET_GROUPS);

        const groupsDomain = this.groupMapper.toDomain(groups);
        const groupsDto = this.groupMapper.toDTO(groupsDomain);

        return right(groupsDto);
    }

    deleteGroup = async (groupId: string): Promise<Either<GroupError, GroupEntity>> => {
        const group = await this.groupRepository.findGroupById(groupId);
        if (!group) return left(GroupError.GROUP_NOT_FOUND);

        await this.groupRepository.deleteGroup(groupId);

        const mapped = this.groupMapper.toDomain(group);

        return right(this.groupMapper.toDTO(mapped));
    }
}

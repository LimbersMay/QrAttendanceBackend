import {GroupRepository} from "../infrastructure/repository";
import {UUIDGenerator} from "../../shared/application/services/UUIDGenerator";
import {Either} from "../../../shared/types/ErrorEither";
import {GroupError} from "./errors/group.errors";
import {GroupValue} from "../domain/group.value";
import {isRight, left, right} from "fp-ts/Either";
import {GroupMapper} from "../infrastructure/mappers";
import {GroupDTO} from "./entities/group.dto";

export class GroupService {

    constructor(
        private readonly groupRepository: GroupRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly groupMapper: GroupMapper
    ) {
    }

    createGroup = async (name: string, userId: string): Promise<Either<GroupError, GroupDTO>> => {
        const group = GroupValue.create({
            groupId: this.uuidGenerator.random(),
            userId,
            name,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const result = await this.groupRepository.createGroup(group);

        return isRight(result)
            ? right(this.groupMapper.toDTO(result.right))
            : left(result.left);
    }

    getGroupsByUserId = async (userId: string): Promise<Either<GroupError, GroupDTO[]>> => {
        const groups = await this.groupRepository.findGroupsByUserId(userId);

        return isRight(groups)
            ? right(this.groupMapper.toDTO(groups.right))
            : left(groups.left);
    }

    getGroupById = async (groupId: string, userId: string): Promise<Either<GroupError, GroupDTO>> => {
        const group = await this.groupRepository.findGroupById(groupId, userId);

        return isRight(group)
            ? right(this.groupMapper.toDTO(group.right))
            : left(group.left);
    }

    deleteGroup = async (groupId: string, userId: string): Promise<Either<GroupError, number>> => {
        const result = await this.groupRepository.deleteGroup(groupId, userId);

        return isRight(result)
            ? right(result.right)
            : left(result.left);
    }

    updateGroup = async(groupId: string, userId: string, fields: Record<string, any>): Promise<Either<GroupError, number>> => {

        const result = await this.groupRepository.updateGroup(groupId, userId, fields);

        return isRight(result)
            ? right(result.right)
            : left(result.left);
    }
}

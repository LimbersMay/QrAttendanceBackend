import {GroupEntity} from "./group.entity";
import {GroupError} from "../application/errors/group.errors";
import {Either} from "../../../shared/types/ErrorEither";

export interface GroupRepository {
    findGroupById(groupId: string, userId: string): Promise<Either<GroupError, GroupEntity>>;
    findGroupsByUserId(userId: string): Promise<Either<GroupError, GroupEntity[]>>;
    createGroup(group: GroupEntity): Promise<GroupEntity>;
    deleteGroup(groupId: string, userId: string): Promise<Either<GroupError, number>>;
    updateGroup(groupId: string, userId: string, fields: Record<string, any>): Promise<Either<GroupError, number>>;
}

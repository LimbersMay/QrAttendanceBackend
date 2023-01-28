import Group from "../model/group.schema";
import {GroupEntity} from "../../domain/group.entity";
import {Either} from "../../../../shared/types/ErrorEither";
import {GroupError} from "../../application/errors/group.errors";
import {left, right} from "fp-ts/Either";
import {GroupRepository} from "../../domain/group.repository";

export class GroupMysqlRepository implements GroupRepository {

    public async findGroupById(groupId: string, userId: string): Promise<Either<GroupError, GroupEntity>> {


        const group = await Group.findOne({
            where: {
                groupId,
                userId
            }
        });

        return (group)
            ? right({
                groupId: group.groupId,
                name: group.name,
                userId: group.userId,
                createdAt: group.createdAt,
                updatedAt: group.updatedAt
            })
            : left(GroupError.GROUP_NOT_FOUND);


    }

    public async findGroupsByUserId(userId: string): Promise<Either<GroupError, GroupEntity[]>> {


        const groups = await Group.findAll({
            where: {
                userId
            }
        });

        return right(groups.map(group => ({
            groupId: group.groupId,
            name: group.name,
            userId: group.userId,
            createdAt: group.createdAt,
            updatedAt: group.updatedAt
        })));
    }

    public async createGroup(user: GroupEntity): Promise<Either<GroupError, GroupEntity>> {

        const groupCreated = await Group.create(user);

        return right({
            groupId: groupCreated.groupId,
            name: groupCreated.name,
            userId: groupCreated.userId,
            createdAt: groupCreated.createdAt,
            updatedAt: groupCreated.updatedAt
        });
    }

    public async deleteGroup(groupId: string, userId: string): Promise<Either<GroupError, number>> {
        const rowsDestroyed = await Group.destroy({
            where: {
                groupId,
                userId
            }
        });

        return (rowsDestroyed > 0)
            ? right(rowsDestroyed)
            : left(GroupError.GROUP_NOT_FOUND);
    }

    async updateGroup(groupId: string, userId: string, fields: Record<string, any>): Promise<Either<GroupError, number>> {

        const rowsUpdated = await Group.update(
            {
                ...fields
            },
            {
                where: {
                    groupId,
                    userId
                }
            });

        return (rowsUpdated[0] > 0)
            ? right(rowsUpdated[0])
            : left(GroupError.GROUP_NOT_FOUND);
    }
}

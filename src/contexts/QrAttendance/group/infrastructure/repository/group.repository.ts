import {WhereOptions} from "sequelize";
import {inject, injectable} from "inversify";
import {left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../apps/QrAttendance/dependency-injection/types";
import {Criteria, Either, SpecificationBuilder} from "../../../shared";
import Group from "../";
import {GroupEntity, GroupError, GroupQuery, GroupRepository} from "../../domain";

@injectable()
export class GroupMysqlRepository implements GroupRepository {

    public constructor(
        @inject(TYPES.SpecificationBuilder) private readonly specificationBuilder: SpecificationBuilder<unknown, WhereOptions<GroupEntity>>
    ) {
    }

    public async findAll(specifications: Criteria): Promise<Either<GroupError, GroupEntity[]>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const groups = await Group.findAll({
            where: whereClause
        });

        return right(groups.map(group => ({
            groupId: group.groupId,
            name: group.name,
            userId: group.userId,
            createdAt: group.createdAt,
            updatedAt: group.updatedAt
        })));
    }

    public async findOne(specifications: Criteria): Promise<Either<GroupError, GroupEntity>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const group = await Group.findOne({
            where: whereClause
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

    public async createGroup(user: GroupEntity): Promise<GroupEntity> {

        const groupCreated = await Group.create(user);

        return {
            groupId: groupCreated.groupId,
            name: groupCreated.name,
            userId: groupCreated.userId,
            createdAt: groupCreated.createdAt,
            updatedAt: groupCreated.updatedAt
        };
    }

    public async deleteGroup(specifications: Criteria): Promise<Either<GroupError, number>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const rowsDestroyed = await Group.destroy({
            where: whereClause
        });

        return (rowsDestroyed > 0)
            ? right(rowsDestroyed)
            : left(GroupError.GROUP_NOT_FOUND);
    }

    async updateGroup(specifications: Criteria, fields: GroupQuery): Promise<Either<GroupError, number>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const rowsUpdated = await Group.update(
            {
                ...fields
            },
            {
                where: whereClause
            });

        return (rowsUpdated[0] > 0)
            ? right(rowsUpdated[0])
            : left(GroupError.GROUP_NOT_FOUND);
    }
}

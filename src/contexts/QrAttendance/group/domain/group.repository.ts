import {Either, Criteria} from "../../shared";
import {GroupError, GroupEntity, GroupQuery} from "./";

export interface GroupRepository {
    findAll(specifications: Criteria): Promise<Either<GroupError, GroupEntity[]>>;
    findOne(specifications: Criteria): Promise<Either<GroupError, GroupEntity>>;
    createGroup(group: GroupEntity): Promise<GroupEntity>;
    deleteGroup(specifications: Criteria): Promise<Either<GroupError, number>>;
    updateGroup(specifications: Criteria, fields: GroupQuery): Promise<Either<GroupError, number>>;
}

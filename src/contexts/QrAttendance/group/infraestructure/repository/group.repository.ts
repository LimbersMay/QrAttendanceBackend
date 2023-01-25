import Group from "../model/group.schema";

export class GroupRepository {

    public async findGroupById (groupId: string) {
        return Group.findByPk(groupId);
    }

    public async findGroupsByUserId (userId: string) {
        return Group.findAll({
            where: {
                user_id: userId
            }
        });
    }

    public async createGroup ({ name, user_id, group_id, createdAt, updatedAt }: {name: string, user_id: string, group_id: string, createdAt: Date, updatedAt: Date}) {
        return Group.create({
            name,
            group_id,
            user_id,
            createdAt,
            updatedAt
        });
    }

    public async deleteGroup (groupId: string, userId: string) {
        return Group.destroy({
            where: {
                group_id: groupId,
                user_id: userId
            }
        });
    }

    async updateGroup(groupId: string, userId: string, fields: Record<string, any>) {

        Group.update(
            {
                ...fields
            },
            {
                where: {
                    group_id: groupId,
                    user_id: userId
                }
            }
        )

        return Group.findOne({
            where: {
                group_id: groupId,
                user_id: userId
            }
        });
    }
}

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

    public async createGroup ({ name, userId, createdAt, updatedAt }: {name: string, userId: string, createdAt: Date, updatedAt: Date}) {
        return Group.create({name, userId, createdAt, updatedAt});
    }

    public async deleteGroup (groupId: string) {
        return Group.destroy({
            where: {
                group_id: groupId
            }
        });
    }

    async updateGroup(fields: any, groupId: string) {

        Group.update(
            {
                ...fields
            },
            {
                where: {
                    group_id: groupId
                }
            }
        )

        return Group.findByPk(groupId);
    }
}

import User from "../../../user/infraestructure/model/user.schema";

export class GroupRepository {

    public async findGroupById (groupId: string) {
        return User.findByPk(groupId);
    }

    public async createGroup ({ name, userId, createdAt, updatedAt }: {name: string, userId: string, createdAt: Date, updatedAt: Date}) {
        return User.create({ name, userId, createdAt, updatedAt });
    }

    public async deleteGroup (groupId: string) {
        return User.destroy({
            where: {
                group_id: groupId
            }
        });
    }

    async updateGroup(fields: any, userId: string) {

        await User.update(
            {
                ...fields
            },
            {
                where: {
                    user_id: userId
                }
            }
        )

        return await User.findByPk(userId);
    }
}

import User from '../model/user.schema';
import {UserQuery} from "../../domain/user.query";


export class UserRepository {

    public constructor(){}
    async findUserByEmail(email: string){
        return await User.findOne({
            where: {
                email
            }
        });
    }
    async findUserById(userId: string) {
        return await User.findByPk(userId);
    }
    async createUser(user: any): Promise<void> {
        await User.create(user);
    }
    async deleteUser(userId: string){

        const user = await User.findByPk(userId);

        await User.destroy({
            where: {
                user_id: userId
            }
        });

        return user;
    }
    async updateUser(fields: UserQuery, userId: string) {

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
    async listUsers() {
        return await User.findAll();
    }
}

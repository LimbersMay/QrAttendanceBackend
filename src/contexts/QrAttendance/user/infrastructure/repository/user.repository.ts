import User from '../model/user.schema';
import {injectable} from "inversify";
import {left, right} from "fp-ts/Either";

import {UserQuery} from "../../domain/user.query";
import {Either} from "../../../../shared/types/ErrorEither";
import {UserError} from "../../domain/errors/userError";
import {UserEntity, UserRepository} from "../../domain";

@injectable()
export class UserMysqlRepository implements UserRepository {

    public constructor(){}
    async findUserByEmail(email: string): Promise<Either<UserError, UserEntity>>{

        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) return left(UserError.USER_NOT_FOUND);

        return right({
            userId: user.userId,
            name: user.name,
            email: user.email,
            password: user.password,
            lastname: user.lastname,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    }
    async findUserById(userId: string): Promise<Either<UserError, UserEntity>> {
        const user = await User.findByPk(userId);
        if(!user) return left(UserError.USER_NOT_FOUND);

        return right({
            userId: user.userId,
            name: user.name,
            email: user.email,
            password: user.password,
            lastname: user.lastname,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    }
    async createUser(user: UserEntity): Promise<Either<UserError, UserEntity>> {

        const userCreated = await User.create(user);
        if (!userCreated) return left(UserError.DUPLICATED_EMAIL);

        return right({
            userId: userCreated.userId,
            name: userCreated.name,
            email: userCreated.email,
            password: userCreated.password,
            lastname: userCreated.lastname,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        });
    }
    async deleteUser(userId: string): Promise<Either<UserError, number>>{

        const rows = await User.destroy({
            where: {
                userId: userId
            }
        });

        return (rows > 0)
            ? right(rows)
            : left(UserError.USER_NOT_FOUND);
    }
    async updateUser(fields: UserQuery, userId: string): Promise<Either<UserError, number>> {

        const rowsAffected = await User.update(
            {
                ...fields
            },
            {
                where: {
                    userId: userId
                }
            }
        )

        return (rowsAffected[0] > 0)
            ? right(rowsAffected[0])
            : left(UserError.USER_NOT_FOUND);
    }
}

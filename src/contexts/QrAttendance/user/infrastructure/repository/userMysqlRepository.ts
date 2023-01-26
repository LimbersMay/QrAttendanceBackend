import User from '../model/user.schema';
import {UserQuery} from "../../domain/user.query";
import {Either} from "../../../../shared/types/ErrorEither";
import {UserError} from "../../domain/errors/userError";
import {left, right} from "fp-ts/Either";
import {UserEntity} from "../../domain";

export class UserMysqlRepository {

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

        return (rows === 0)
            ? left(UserError.USER_NOT_FOUND)
            : right(rows);
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

        return (rowsAffected[0] === 0)
            ? left(UserError.USER_NOT_FOUND)
            : right(rowsAffected[0]);
    }
}

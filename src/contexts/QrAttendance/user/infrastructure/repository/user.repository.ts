import {inject, injectable} from "inversify";
import {left, right} from "fp-ts/Either";
import {WhereOptions} from "sequelize";

import {TYPES} from "../../../../../apps/QrAttendance/dependency-injection/types";
import {SpecificationBuilder} from "../../../../shared/specifications/specification-builder";
import {Either} from "../../../../shared/types/ErrorEither";
import {Criteria} from '../../../../shared/specifications/specification';

import User from '../model/user.schema';

import {UserEntity, UserRepository, UserQuery, UserError} from "../../domain";


@injectable()
export class UserMysqlRepository implements UserRepository {

    public constructor(
        @inject(TYPES.SpecificationBuilder) private readonly specificationBuilder: SpecificationBuilder<unknown, WhereOptions<UserEntity>>
    ) {}

    public async findAll(specifications: Criteria): Promise<Either<UserError, UserEntity[]>> {
        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const matchedUsers = await User.findAll({ where: whereClause });
        if (!matchedUsers) return left(UserError.USER_NOT_FOUND);

        return right(matchedUsers.map(user => ({
            userId: user.userId,
            name: user.name,
            email: user.email,
            password: user.password,
            lastname: user.lastname,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })));
    }

    public async findOne(query: Criteria): Promise<Either<UserError, UserEntity>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(query);

        const matchedUser = await User.findOne({ where: whereClause });

        if (!matchedUser) return left(UserError.USER_NOT_FOUND);

        return right({
            userId: matchedUser.userId,
            name: matchedUser.name,
            email: matchedUser.email,
            password: matchedUser.password,
            lastname: matchedUser.lastname,
            createdAt: matchedUser.createdAt,
            updatedAt: matchedUser.updatedAt
        });
    }

    public async createUser(user: UserEntity): Promise<Either<UserError, UserEntity>> {

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
    public async deleteUser(criteria: Criteria): Promise<Either<UserError, number>>{

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(criteria);

        const rows = await User.destroy({
            where: whereClause
        });

        return (rows > 0)
            ? right(rows)
            : left(UserError.USER_NOT_FOUND);
    }

    public async updateUser(fields: UserQuery, criteria: Criteria): Promise<Either<UserError, number>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(criteria);

        const rowsAffected = await User.update(
            {
                ...fields
            },
            {
                where: whereClause
            }
        )

        return (rowsAffected[0] > 0)
            ? right(rowsAffected[0])
            : left(UserError.USER_NOT_FOUND);
    }
}

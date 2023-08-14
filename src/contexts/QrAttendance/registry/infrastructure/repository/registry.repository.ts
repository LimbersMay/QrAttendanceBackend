import {WhereOptions} from "sequelize";
import {inject, injectable} from "inversify";
import { right, left } from "fp-ts/Either";
import {Criteria, Either, SpecificationBuilder} from "../../../shared";
import Registry from "../model/registry.schema";
import {RegistryEntity, RegistryErrors, RegistryQuery, RegistryRepository} from "../../domain";
import {TYPES} from "../../../../../apps/QrAttendance/dependency-injection/types";

@injectable()
export class RegistryMysqlRepository implements RegistryRepository {

    public constructor(
        @inject(TYPES.SpecificationBuilder) private readonly specificationBuilder: SpecificationBuilder<unknown, WhereOptions<RegistryEntity>>
    ) {}

    async createRegistry(registry: RegistryEntity): Promise<RegistryEntity> {
        const newRegistry = await Registry.create(registry);

        return this.toDomain(newRegistry);
    }

    async deleteRegistry(specifications: Criteria): Promise<Either<RegistryErrors, number>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const rowsDestroyed = await Registry.destroy({
            where: whereClause
        });

        return (rowsDestroyed > 0)
            ? right(rowsDestroyed)
            : left(RegistryErrors.REGISTRY_NOT_FOUND);

    }

    async findAll(specifications: Criteria): Promise<RegistryEntity[]> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const registries = await Registry.findAll({
            where: whereClause
        });

        return registries.map(registry => this.toDomain(registry));
    }

    async findOne(specifications: Criteria): Promise<Either<RegistryErrors, RegistryEntity>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const registry = await Registry.findOne({
            where: whereClause
        });

        return (registry)
            ? right(this.toDomain(registry))
            : left(RegistryErrors.REGISTRY_NOT_FOUND);
    }

    async updateRegistry(fields: RegistryQuery, specifications: Criteria): Promise<Either<RegistryErrors, number>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const rowsUpdated = await Registry.update({
            ...fields
        },
            {
            where: whereClause
        });

        return (rowsUpdated[0] > 0)
            ? right(rowsUpdated[0])
            : left(RegistryErrors.REGISTRY_NOT_FOUND);

    }

    toDomain(registry: Registry): RegistryEntity {
        return {
            qrId: registry.qrId,
            registryId: registry.registryId,
            name: registry.name,
            group: registry.group,
            career: registry.career,
            firstSurname: registry.firstSurname,
            secondSurname: registry.secondSurname,
            ownerId: registry.ownerId,
            checkinTime: registry.checkinTime,
            createdAt: registry.createdAt,
            updatedAt: registry.updatedAt
        };
    }
}

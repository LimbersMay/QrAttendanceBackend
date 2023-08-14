import {injectable} from "inversify";
import * as E from "fp-ts/Either";
import {Either} from "../../../shared";
import Registry from "../model/registry.schema";
import {RegistryRepository} from "../../domain/registry.repository";
import {RegistryEntity} from "../../domain/registry.entity";
import {RegistryErrors} from "../../domain/registryErrors";
import {RegistryQuery} from "../../domain/registry.query";

@injectable()
export class RegistryMysqlRepository implements RegistryRepository {

    constructor() {}

    async createRegistry(registry: RegistryEntity): Promise<RegistryEntity> {
        const newRegistry = await Registry.create(registry);

        return this.toDomain(newRegistry);
    }

    async deleteRegistry(registryId: string, userId: string): Promise<Either<RegistryErrors, number>> {

        const rowsDestroyed = await Registry.destroy({
            where: {
                registryId,
                ownerId: userId
            }
        });

        return (rowsDestroyed > 0)
            ? E.right(rowsDestroyed)
            : E.left(RegistryErrors.REGISTRY_NOT_FOUND);

    }

    async findRegistriesByUserId(userId: string): Promise<Either<RegistryErrors, RegistryEntity[]>> {

        const registries = await Registry.findAll({
            where: {
                ownerId: userId
            }
        });

        return E.right(registries.map(registry => this.toDomain(registry)));
    }

    async findRegistryById(registryId: string, userId: string): Promise<Either<RegistryErrors, RegistryEntity>> {

        const registry = await Registry.findOne({
            where: {
                registryId,
            }
        });

        return (registry)
            ? E.right(this.toDomain(registry))
            : E.left(RegistryErrors.REGISTRY_NOT_FOUND);
    }

    async updateRegistry(fields: RegistryQuery, registryId: string, userId: string): Promise<Either<RegistryErrors, number>> {

        const rowsUpdated = await Registry.update({
            ...fields
        },
            {
            where: {
                registryId,
                ownerId: userId
            }
        });

        return (rowsUpdated[0] > 0)
            ? E.right(rowsUpdated[0])
            : E.left(RegistryErrors.REGISTRY_NOT_FOUND);

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

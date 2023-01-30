import {Request, Response} from "express";
import {injectable} from "inversify";
import * as E from 'fp-ts/lib/Either';

import {RegistryCreator, RegistryDeleter, RegistryFinder, RegistryUpdater} from "../../application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {RegistryError} from "../../domain/errors/registry.error";

@injectable()
export class RegistryController {
    constructor(
        private readonly registryCreator: RegistryCreator,
        private readonly registryFinder: RegistryFinder,
        private readonly registryDeleter: RegistryDeleter,
        private readonly registryUpdater: RegistryUpdater
    ) {
    }

    create = async (req: Request, res: Response) => {
        if (!req.user) return ResponseEntity.status(401).body("NOT-AUTHENTICATED").send(res);

        const {id: userId} = req.user;
        const {qrId, name, firstSurname, secondSurname} = req.body;

        const registry = await this.registryCreator.execute(qrId, userId, name, firstSurname, secondSurname);

        if (E.isRight(registry))
            return ResponseEntity
                .status(201)
                .body(registry.right)
                .send(res);

        return this.handleErrors(res, registry.left);
    }

    find = async(req: Request, res: Response) => {
        if (!req.user) return ResponseEntity.status(401).body("NOT-AUTHENTICATED").send(res);

        const {id: userId} = req.user;
        const {registryId} = req.body;

        const registry = await this.registryFinder.execute(registryId, userId);

        if (E.isRight(registry))
            return ResponseEntity
                .status(200)
                .body(registry.right)
                .send(res);

        return this.handleErrors(res, registry.left);
    }

    findByUserId = async (req: Request, res: Response) => {
       if (!req.user) return ResponseEntity.status(401).body("NOT-AUTHENTICATED").send(res);

        const {id: userId} = req.user;
        const registries = await this.registryFinder.executeByUserId(userId);

        if (E.isRight(registries))
            return ResponseEntity
                .status(200)
                .body(registries.right)
                .send(res);

        return this.handleErrors(res, registries.left);
    }

    update = async(req: Request, res: Response) => {
        if (!req.user) return ResponseEntity.status(401).body("NOT-AUTHENTICATED").send(res);

        const {id: userId} = req.user;
        const {id, updatedFields} = req.body;

        const expectedFields = {
            name: updatedFields.name,
            firstSurname: updatedFields.firstSurname,
            secondSurname: updatedFields.secondSurname,
            updatedAt: updatedFields.updatedAt
        }

        const registry = await this.registryUpdater.execute(expectedFields, id, userId);

        if (E.isRight(registry))
            return ResponseEntity
                .status(200)
                .body(registry.right)
                .send(res);

        return this.handleErrors(res, registry.left);
    }

    delete = async(req: Request, res: Response) => {
        if (!req.user) return ResponseEntity.status(401).body("NOT-AUTHENTICATED").send(res);

        const {id: userId} = req.user;
        const {registryId} = req.body;

        const registry = await this.registryDeleter.execute(registryId, userId);

        if (E.isRight(registry))
            return ResponseEntity
                .status(200)
                .body(registry.right)
                .send(res);

        return this.handleErrors(res, registry.left);
    }

    private handleErrors = (res: Response, error: RegistryError) => {
        switch (error) {
            case RegistryError.REGISTRY_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(error)
                    .send(res);

            case RegistryError.REGISTRIES_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(error)
                    .send(res);

            case RegistryError.REGISTRY_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(400)
                    .body(error)
                    .send(res);

            case RegistryError.REGISTRY_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);

            case RegistryError.REGISTRIES_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);

            case RegistryError.REGISTRY_CANNOT_BE_UPDATED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);

            case RegistryError.REGISTRY_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(error)
                    .send(res);
        }
    }
}

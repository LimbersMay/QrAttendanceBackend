import {Response} from "express";
import {
    Body,
    Controller, CurrentUser,
    Delete,
    Get,
    Res, UseBefore,
    Post,
    Put, Params
} from "routing-controllers";
import {injectable} from "inversify";
import {isRight} from "fp-ts/Either";
import {ResponseEntity} from "../../../shared";
import {RegistryCreator, RegistryDeleter, RegistryFinder, RegistryUpdater} from "../../application";
import {RegistryError, OwnerIdSpecification, RegistryIdSpecification} from "../../domain";
import {IsAuthenticated} from "../../../auth";
import {UserResponse} from "../../../user";
import {CreateRegistryDTO} from "../../application/validations/registry.create";
import {UpdateRegistryDTO} from "../../application/validations/registry.update";
import {RegistryIdDTO} from "../../application/validations/registryId";

@Controller('/registry')
@UseBefore(IsAuthenticated)
@injectable()
export class RegistryController {
    constructor(
        private readonly registryCreator: RegistryCreator,
        private readonly registryFinder: RegistryFinder,
        private readonly registryDeleter: RegistryDeleter,
        private readonly registryUpdater: RegistryUpdater
    ) {}

    @Get('/')
    public async findAll(
        @Res() res: Response,
        @CurrentUser() user: UserResponse
    ) {

        const registries = await this.registryFinder.findAll(
            new OwnerIdSpecification(user.id),
        );

        if (isRight(registries))
            return ResponseEntity
                .status(200)
                .body(registries.right)
                .buid();

        return this.handleErrors(registries.left, res);
    }

    @Post('/')
    public async create (
        @Res() res: Response,
        @Body() registryDTO: CreateRegistryDTO,
        @CurrentUser() user: UserResponse
    ) {

        const registry = await this.registryCreator.execute(registryDTO, user.id);

        if (isRight(registry))
            return ResponseEntity
                .status(201)
                .body(registry.right)
                .buid();

        return this.handleErrors(registry.left, res);
    }

    @Put('/:id')
    public async update (
        @Res() res: Response,
        @Body() registryDTO: UpdateRegistryDTO,
        @Params() { id: registryId }: RegistryIdDTO,
        @CurrentUser() user: UserResponse
    ) {

        const registry = await this.registryUpdater.execute(registryDTO, [
            new RegistryIdSpecification(registryId),
            new OwnerIdSpecification(user.id)
        ]);

        if (isRight(registry))
            return ResponseEntity
                .status(200)
                .body({ rowsUpdated: registry.right })
                .buid();

        return this.handleErrors(registry.left, res);
    }

    @Delete('/:id')
    public async delete (
        @Res() res: Response,
        @Params() { id: registryId}: RegistryIdDTO,
        @CurrentUser() user: UserResponse
    ) {

        const result = await this.registryDeleter.execute([
            new RegistryIdSpecification(registryId),
            new OwnerIdSpecification(user.id)
        ]);

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body({ rowsDeleted: result.right })
                .buid();

        return this.handleErrors(result.left, res);
    }

    private handleErrors = (error: RegistryError, res: Response) => {
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

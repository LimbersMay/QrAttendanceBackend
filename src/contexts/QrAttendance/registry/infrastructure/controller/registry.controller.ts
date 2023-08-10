import {Request, Response} from "express";
import {injectable} from "inversify";

import {RegistryCreator, RegistryDeleter, RegistryFinder, RegistryUpdater} from "../../application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {RegistryError} from "../../domain/errors/registry.error";
import {
    Body,
    Controller, CurrentUser,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req, Res, UseBefore
} from "routing-controllers";
import {IsAuthenticated} from "../../../auth/infrastructure/middlewares";
import {UserResponse} from "../../../user/application/responses/user.response";
import {isRight} from "fp-ts/Either";

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
        @Req() req: Request,
        @Res() res: Response,
        @CurrentUser() user: UserResponse
    ) {

        const registries = await this.registryFinder.executeByUserId(user.id);

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
        @Body() body: any,
        @CurrentUser() user: UserResponse
    ) {

        const {qrId, name, group, career, firstSurname, secondSurname} = body;

        const registry = await this.registryCreator.execute(qrId, user.id, name, group, career, firstSurname, secondSurname);

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
        @Body() updatedFields: any,
        @Param('id') id: string,
        @CurrentUser() user: UserResponse
    ) {

        const expectedFields = {
            name: updatedFields.name,
            group: updatedFields.group,
            career: updatedFields.career,
            firstSurname: updatedFields.firstSurname,
            secondSurname: updatedFields.secondSurname,
            checkinTime: updatedFields.checkinTime
        }

        const registry = await this.registryUpdater.execute(expectedFields, id, user.id);

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
        @Param('id') id: string,
        @CurrentUser() user: UserResponse
    ) {

        const registry = await this.registryDeleter.execute(id, user.id);

        if (isRight(registry))
            return ResponseEntity
                .status(200)
                .body({ rowsDeleted: registry.right })
                .buid();

        return this.handleErrors(registry.left, res);
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

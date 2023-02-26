import {Request, Response} from "express";
import {injectable} from "inversify";
import * as E from 'fp-ts/lib/Either';

import {RegistryCreator, RegistryDeleter, RegistryFinder, RegistryUpdater} from "../../application/useCases";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {RegistryError} from "../../domain/errors/registry.error";
import {
    Body,
    BodyParam,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req, Res, UseBefore
} from "routing-controllers";
import {IsAuthenticated} from "../../../auth/infrastructure/middlewares";

@Controller('/registry')
@injectable()
export class RegistryController {
    constructor(
        private readonly registryCreator: RegistryCreator,
        private readonly registryFinder: RegistryFinder,
        private readonly registryDeleter: RegistryDeleter,
        private readonly registryUpdater: RegistryUpdater
    ) {
    }

    @Post('/create')
    @UseBefore(IsAuthenticated)
    public async create (@Req() req: Request, @Res() res: Response, @Body() body: any) {

        // @ts-ignore
        const {id: userId} = req.user;
        const {qrId, name, group, career, firstSurname, secondSurname} = body;

        const registry = await this.registryCreator.execute(qrId, userId, name, group, career, firstSurname, secondSurname);

        if (E.isRight(registry))
            return ResponseEntity
                .status(201)
                .body(registry.right)
                .buid();

        return this.handleErrors(registry.left, res);
    }

    @Get('/find')
    @UseBefore(IsAuthenticated)
    public async find (@Req() req: Request, @Res() res: Response, @BodyParam('registryId') registryId: string) {

        // @ts-ignore
        const {id: userId} = req.user;

        const registry = await this.registryFinder.execute(registryId, userId);

        if (E.isRight(registry))
            return ResponseEntity
                .status(200)
                .body(registry.right)
                .buid();

        return this.handleErrors(registry.left, res);
    }

    @Get('/all')
    @UseBefore(IsAuthenticated)
    public async findByUserId(@Req() req: Request, @Res() res: Response) {

        // @ts-ignore
        const {id: userId} = req.user;
        const registries = await this.registryFinder.executeByUserId(userId);

        if (E.isRight(registries))
            return ResponseEntity
                .status(200)
                .body(registries.right)
                .buid();

        return this.handleErrors(registries.left, res);
    }

    @Put('/update')
    @UseBefore(IsAuthenticated)
    public async update (@Req() req: Request, @Res() res: Response, @Body() body: any) {

        // @ts-ignore
        const {id: userId} = req.user;
        const {id, updatedFields} = body;

        const expectedFields = {
            name: updatedFields.name,
            group: updatedFields.group,
            career: updatedFields.career,
            firstSurname: updatedFields.firstSurname,
            secondSurname: updatedFields.secondSurname,
            checkinTime: updatedFields.checkinTime
        }

        const registry = await this.registryUpdater.execute(expectedFields, id, userId);

        if (E.isRight(registry))
            return ResponseEntity
                .status(200)
                .body(registry.right)
                .buid();

        return this.handleErrors(registry.left, res);
    }

    @Delete('/delete/:id')
    @UseBefore(IsAuthenticated)
    public async delete (@Req() req: Request, @Res() res: Response, @Param('id') id: string) {

        // @ts-ignore
        const {id: userId} = req.user;

        const registry = await this.registryDeleter.execute(id, userId);

        if (E.isRight(registry))
            return ResponseEntity
                .status(200)
                .body(registry.right)
                .buid();

        return this.handleErrors(registry.left, res);
    }

    private handleErrors = (error: RegistryError, res: Response) => {
        console.log(error);
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

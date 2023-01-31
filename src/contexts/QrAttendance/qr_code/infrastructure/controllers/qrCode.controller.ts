import {QrCodeCreator, QrCodeDeleter, QrCodeFinder, QrCodeUpdater} from "../../application/useCases";
import {Request} from "express";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {isRight} from "fp-ts/Either";
import {QrCodeError} from "../../domain/errors/qrCode.errors";
import {injectable} from "inversify";
import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseBefore} from "routing-controllers";
import {IsAuthenticated} from "../../../auth/infrastructure/middlewares";

@Controller('/qrCode')
@injectable()
export class QrCodeController {
    constructor(
        private qrCodeFinder: QrCodeFinder,
        private qrCodeUpdater: QrCodeUpdater,
        private qrCodeDeleter: QrCodeDeleter,
        private qrCodeCreator: QrCodeCreator
    ) {}

    @Get('/:id([0-9]+)')
    @UseBefore(IsAuthenticated)
    public async find (@Param("id") id: string, @Req() req: Request) {

        // @ts-ignore
        const { id: userId } = req.user;

        const qrCode = await this.qrCodeFinder.execute(id, userId);

        if (isRight(qrCode))
            return ResponseEntity
                .status(200)
                .body(qrCode.right)
                .buid();

        return this.handleError(qrCode.left);
    }

    @Get('/all')
    @UseBefore(IsAuthenticated)
    public async findByUserId (@Req() req: Request) {

        // @ts-ignore
        const { id: userId } = req.user;

        const qrCode = await this.qrCodeFinder.executeByUserId(userId);

        if (isRight(qrCode))
            return ResponseEntity
                .status(200)
                .body(qrCode.right)
                .buid();

       return this.handleError(qrCode.left);
    }

    @Post('/create')
    @UseBefore(IsAuthenticated)
    public async create (@Body() { name, groupId, enabled}: {name: string, groupId: string, enabled: boolean}, req: Request) {

        // @ts-ignore
        const { id: idUser } = req.user;

        const result = await this.qrCodeCreator.execute(name, groupId, idUser, enabled);

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body(result.right)
                .buid();

        return this.handleError(result.left);
    }

    @Put('/update')
    @UseBefore(IsAuthenticated)
    public async update (@Req() req: Request) {

        // @ts-ignore
        const { id: idUser } = req.user;
        const { id, updatedFields } = req.body;

        const result = await this.qrCodeUpdater.execute(updatedFields, id, idUser);

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body(result.right)
                .buid();

        return this.handleError(result.left)
    }

    @Delete('/delete/:id([0-9]+)')
    @UseBefore(IsAuthenticated)
    public async delete (@Param("id") id: string, @Req() req: Request) {

        // @ts-ignore
        const { id: userId } = req.user;

        const result = await this.qrCodeDeleter.execute(id, userId);

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body(result.right)
                .buid();

        return this.handleError(result.left);
    }

    private handleError = (result: QrCodeError) => {
        switch (result) {
            case QrCodeError.QR_CODE_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(result)
                    .buildError();

            case QrCodeError.QR_CODE_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .buildError();

            case QrCodeError.QR_CODE_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .buildError();

            case QrCodeError.QR_CODE_CANNOT_BE_UPDATED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .buildError();

            case QrCodeError.QR_CODE_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .buildError();

            default:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .buildError();
        }
    }
}

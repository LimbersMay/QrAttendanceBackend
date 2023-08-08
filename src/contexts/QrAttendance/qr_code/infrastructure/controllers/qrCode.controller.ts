import {QrCodeCreator, QrCodeDeleter, QrCodeFinder, QrCodeUpdater} from "../../application/useCases";
import {Response} from "express";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {isRight} from "fp-ts/Either";
import {QrCodeError} from "../../domain/errors/qrCode.errors";
import {injectable} from "inversify";
import {Body, Controller, CurrentUser, Delete, Get, Param, Post, Put, Res, UseBefore} from "routing-controllers";
import {IsAuthenticated} from "../../../auth/infrastructure/middlewares";
import {UserResponse} from "../../../user/application/responses/user.response";
import {QrCodeQuery} from "../../domain/entities/qrCode.query";

@Controller('/qrCode')
@UseBefore(IsAuthenticated)
@injectable()
export class QrCodeController {
    constructor(
        private qrCodeFinder: QrCodeFinder,
        private qrCodeUpdater: QrCodeUpdater,
        private qrCodeDeleter: QrCodeDeleter,
        private qrCodeCreator: QrCodeCreator
    ) {}

    @Get('/')
    public async findAll (
        @Res() res: Response,
        @CurrentUser() user: UserResponse
    ) {

        const qrCode = await this.qrCodeFinder.executeByUserId(user.id);

        if (isRight(qrCode))
            return ResponseEntity
                .status(200)
                .body(qrCode.right)
                .buid();

        return this.handleError(qrCode.left, res);
    }

    @Get('/:id')
    public async findOne (
        @Param('id') id: string,
        @Res() res: Response,
        @CurrentUser() user: UserResponse
    ) {

        const qrCode = await this.qrCodeFinder.execute(id, user.id);

        if (isRight(qrCode))
            return ResponseEntity
                .status(200)
                .body(qrCode.right)
                .buid();

        return this.handleError(qrCode.left, res);
    }

    @Post('/')
    public async create (
        @Res() res: Response,
        @Body() { name, groupId, enabled, url, manualRegistrationDate}: {name: string, groupId: string, enabled: boolean, url: string, manualRegistrationDate: Date},
        @CurrentUser() user: UserResponse
    ) {

        const result = await this.qrCodeCreator.execute(name, groupId, user.id, enabled, url, manualRegistrationDate);

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body(result.right)
                .buid();

        return this.handleError(result.left, res);
    }

    @Put('/:id')
    public async update (
        @Res() res: Response,
        @Body() updatedFields: QrCodeQuery,
        @Param('id') id: string,
        @CurrentUser() user: UserResponse
    ) {

        const result = await this.qrCodeUpdater.execute(updatedFields, id, user.id);

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body({ rowsUpdated: result.right })
                .buid();

        return this.handleError(result.left, res);
    }

    @Delete('/:id')
    public async delete (
        @Res() res: Response,
        @Param('id') id: string,
        @CurrentUser() user: UserResponse
    ) {

        const result = await this.qrCodeDeleter.execute(id, user.id);

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body({ rowsDeleted: result.right })
                .buid();

        return this.handleError(result.left, res);
    }

    private handleError = (result: QrCodeError, res: Response) => {
        switch (result) {
            case QrCodeError.QR_CODE_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(result)
                    .send(res);

            case QrCodeError.QR_CODE_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            case QrCodeError.QR_CODE_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            case QrCodeError.QR_CODE_CANNOT_BE_UPDATED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            case QrCodeError.QR_CODE_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            default:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);
        }
    }
}

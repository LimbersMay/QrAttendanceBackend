import {Response} from "express";
import {
    Body,
    Controller,
    CurrentUser,
    Delete,
    Get,
    Params,
    Post,
    Put,
    Res,
    UseBefore
} from "routing-controllers";
import {injectable} from "inversify";
import {isRight} from "fp-ts/Either";
import {ResponseEntity} from "../../../shared";
import {QrCodeCreator, QrCodeDeleter, QrCodeFinder, QrCodeUpdater} from "../../application";
import {QrCodeError, QrCodeIdSpecification, OwnerIdSpecification} from "../../domain";
import {IsAuthenticated} from "../../../auth";
import {UserResponse} from "../../../user";
import {QrCodeIdDTO} from "../../application/validations/qrCodeIdDTO";
import {CreateQrCodeDTO} from "../../application/validations/qrCode.create";
import {UpdateQrCodeDTO} from "../../application/validations/qrCode.update";

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

        const result = await this.qrCodeFinder.findAll(
            new OwnerIdSpecification(user.id)
        );

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body(result.right)
                .buid();

        return this.handleError(result.left, res);
    }

    @Get('/:id')
    public async findOne (
        @Params() { id: qrCodeId }: QrCodeIdDTO,
        @Res() res: Response,
        @CurrentUser() user: UserResponse
    ) {

        const result = await this.qrCodeFinder.findOne([
            new OwnerIdSpecification(user.id),
            new QrCodeIdSpecification(qrCodeId)
        ]);

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body(result.right)
                .buid();

        return this.handleError(result.left, res);
    }

    @Post('/')
    public async create (
        @Res() res: Response,
        @Body() qrCodeDataDTO: CreateQrCodeDTO,
        @CurrentUser() user: UserResponse
    ) {

        const result = await this.qrCodeCreator.execute(qrCodeDataDTO, user.id);

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
        @Body() qrCodeDTO: UpdateQrCodeDTO,
        @Params() { id: qrCodeId }: QrCodeIdDTO,
        @CurrentUser() user: UserResponse
    ) {

        const result = await this.qrCodeUpdater.execute(qrCodeDTO, [
            new OwnerIdSpecification(user.id),
            new QrCodeIdSpecification(qrCodeId)
        ]);

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
        @Params() { id: qrCodeId }: QrCodeIdDTO,
        @CurrentUser() user: UserResponse
    ) {

        const result = await this.qrCodeDeleter.execute([
            new OwnerIdSpecification(user.id),
            new QrCodeIdSpecification(qrCodeId)
        ]);

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

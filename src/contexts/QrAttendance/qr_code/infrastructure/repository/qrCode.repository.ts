import {QrCodeRepository} from "../../domain/qrCode.repository";
import {QrCodeEntity} from "../../domain/qrCode.entity";
import QrCode from "../models/qrCode.schema";
import {Either} from "../../../../shared/types/ErrorEither";
import {QrCodeError} from "../../domain/errors/qrCode.errors";
import {left, right} from "fp-ts/Either";

export class QrCodeMysqlRepository implements QrCodeRepository{
    async createQrCode(qrCode: QrCodeEntity): Promise<QrCodeEntity> {

        const createdQrCode = await QrCode.create(qrCode);

        return {
            qrId: createdQrCode.qrId,
            groupId: createdQrCode.groupId,
            ownerId: createdQrCode.ownerId,
            name: createdQrCode.name,
            url: createdQrCode.url,
            enabled: createdQrCode.enabled,
            createdAt: createdQrCode.createdAt,
            updatedAt: createdQrCode.updatedAt
        }

    }

    async deleteQrCode(qrCodeId: string, userId: string): Promise<Either<QrCodeError, number>> {

        const rowsDestroyed = await QrCode.destroy({
            where: {
                qrId: qrCodeId,
                ownerId: userId
            }
        });

        return (rowsDestroyed > 0)
            ? right(rowsDestroyed)
            : left(QrCodeError.QR_CODE_NOT_FOUND);
    }
    async findQrCodeById(qrCodeId: string, userId: string): Promise<Either<QrCodeError, QrCodeEntity>> {

        const qrCode = await QrCode.findOne({
            where: {
                qrId: qrCodeId,
                ownerId: userId
            }
        });

        return (qrCode)
            ? right({
                qrId: qrCode.qrId,
                groupId: qrCode.groupId,
                ownerId: qrCode.ownerId,
                name: qrCode.name,
                url: qrCode.url,
                enabled: qrCode.enabled,
                createdAt: qrCode.createdAt,
                updatedAt: qrCode.updatedAt
            })
            : left(QrCodeError.QR_CODE_NOT_FOUND);
    }

    async findQrCodeByUserId(userId: string): Promise<Either<QrCodeError, QrCodeEntity[]>> {
        const qrCodes = await QrCode.findAll({
            where: {
                ownerId: userId
            }
        });

        return (qrCodes)
            ? right(qrCodes.map(qrCode => {
                return {
                    qrId: qrCode.qrId,
                    groupId: qrCode.groupId,
                    ownerId: qrCode.ownerId,
                    name: qrCode.name,
                    url: qrCode.url,
                    enabled: qrCode.enabled,
                    createdAt: qrCode.createdAt,
                    updatedAt: qrCode.updatedAt
                }
            }))
            : left(QrCodeError.QR_CODE_NOT_FOUND);
    }

    async updateQrCode(fields: any, qrCodeId: string): Promise<Either<QrCodeError, number>> {

        const rowsUpdated = await QrCode.update(
            {
            ...fields
        },
            {
            where: {
                qrId: qrCodeId
            }
        });

        return (rowsUpdated[0] > 0)
            ? right(rowsUpdated[0])
            : left(QrCodeError.QR_CODE_NOT_FOUND);

    }
}

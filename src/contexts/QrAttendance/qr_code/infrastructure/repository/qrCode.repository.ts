import {WhereOptions} from "sequelize";
import {inject, injectable} from "inversify";
import {left, right} from "fp-ts/Either";
import {TYPES} from "../../../../../apps/QrAttendance/dependency-injection/types";
import {Criteria, Either, SpecificationBuilder} from "../../../shared";
import QrCode from "../models/qrCode.schema";
import {QrCodeEntity, QrCodeError, QrCodeQuery, QrCodeRepository} from "../../domain";

@injectable()
export class QrCodeMysqlRepository implements QrCodeRepository {

    public constructor(
        @inject(TYPES.SpecificationBuilder) private readonly specificationBuilder: SpecificationBuilder<unknown, WhereOptions<QrCodeEntity>>
    ) {}

    public async findAll(specifications: Criteria): Promise<QrCodeEntity[]> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const qrCodes = await QrCode.findAll({
            where: whereClause
        });

        return qrCodes.map(qrCode => {
            return this.toDomain(qrCode);
        });
    }

    public async findOne(specifications: Criteria): Promise<Either<QrCodeError, QrCodeEntity>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const qrCode = await QrCode.findOne({
            where: whereClause
        });

        return (qrCode)
            ? right(this.toDomain(qrCode))
            : left(QrCodeError.QR_CODE_NOT_FOUND);
    }

    async createQrCode(qrCode: QrCodeEntity): Promise<QrCodeEntity> {

        const createdQrCode = await QrCode.create(qrCode);

        return this.toDomain(createdQrCode);
    }

    async updateQrCode(fields: QrCodeQuery, specifications: Criteria): Promise<Either<QrCodeError, number>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const rowsUpdated = await QrCode.update(
            {
                ...fields
            },
            {
                where: whereClause
            });

        return (rowsUpdated[0] > 0)
            ? right(rowsUpdated[0])
            : left(QrCodeError.QR_CODE_NOT_FOUND);

    }

    async deleteQrCode(specifications: Criteria): Promise<Either<QrCodeError, number>> {

        const whereClause = this.specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const rowsDestroyed = await QrCode.destroy({
            where: whereClause
        });

        return (rowsDestroyed > 0)
            ? right(rowsDestroyed)
            : left(QrCodeError.QR_CODE_NOT_FOUND);
    }

    private toDomain(qrCode: QrCode): QrCodeEntity {
        return {
            qrId: qrCode.qrId,
            groupId: qrCode.groupId,
            ownerId: qrCode.ownerId,
            name: qrCode.name,
            url: qrCode.url,
            formId: qrCode.formId,
            enabled: qrCode.enabled,
            manualRegistrationDate: qrCode.manualRegistrationDate,
            createdAt: qrCode.createdAt,
            updatedAt: qrCode.updatedAt
        }
    }
}

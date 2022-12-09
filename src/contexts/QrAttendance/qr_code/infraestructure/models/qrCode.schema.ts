
import { DataTypes } from "sequelize";
import db from '../../../../shared/infraestructure/db/mysql.connection';

const QrCode = db.define('qrCode', {
    qr_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
    }
}, {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    tableName: "qr_code"
})

export default QrCode;

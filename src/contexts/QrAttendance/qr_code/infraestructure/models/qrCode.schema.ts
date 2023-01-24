import { DataTypes } from "sequelize";
import db from '../../../../shared/infraestructure/db/mysql.connection';
import Registry from "../../../registry/infraestructure/model/registry.schema";

const QrCode = db.define('qrCode', {
    qr_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    group_id: {
        type: DataTypes.STRING
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
});

QrCode.hasMany(Registry, { foreignKey: 'qr_id' });
Registry.belongsTo(QrCode);

export default QrCode;

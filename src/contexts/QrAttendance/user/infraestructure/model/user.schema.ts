import {DataTypes} from "sequelize";
import db from '../../../../shared/infraestructure/db/mysql.connection';

import QrCode from '../../../qr_code/infraestructure/models/qrCode.schema';

const User = db.define('user', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        mothers_name: {
            type: DataTypes.STRING
        },
        fathers_name: {
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
    },
    {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        tableName: "user"
    });

User.hasMany(QrCode, {
    foreignKey: 'user_id',
    as: "qrCodes"
});

QrCode.belongsTo(User);

export default User;

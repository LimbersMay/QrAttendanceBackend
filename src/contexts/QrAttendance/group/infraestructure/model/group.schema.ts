import { DataTypes } from "sequelize";
import db from '../../../../shared/infraestructure/db/mysql.connection';
import QrCode from "../../../qr_code/infraestructure/models/qrCode.schema";

const Group = db.define('group', {
    group_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: "group"
})

Group.hasMany(QrCode, {
    foreignKey: 'group_id'
});

QrCode.belongsTo(Group);

export default Group;

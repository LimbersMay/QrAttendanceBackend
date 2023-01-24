import {DataTypes} from "sequelize";
import db from '../../../../shared/infraestructure/db/mysql.connection';

const Registry = db.define('registry', {
        registry_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mothers_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fathers_name: {
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
    },
    {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName: "registry"
    });

export default Registry;
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
        created_at: {
            type: "TIMESTAMP",
            defaultValue: db.literal("CURRENT_TIMESTAMP")
        },
        updated_at: {
            type: "TIMESTAMP",
            defaultValue: db.literal("CURRENT_TIMESTAMP")
        }
    },
    {
        timestamps: false,
        tableName: "registry"
    });

export default Registry;
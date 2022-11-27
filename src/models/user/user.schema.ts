import { DataTypes } from "sequelize";
import db from '../../db/mysql.connection';

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
        tableName: "user"
    });

export default User;

import { DataTypes } from "sequelize";
import db from '../db/mysql.connection';

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
        type: "TIMESTAMP",
        defaultValue: db.literal("CURRENT_TIMESTAMP"),
        allowNull: false
    },
    updatedAt: {
        type: "TIMESTAMP",
        defaultValue: db.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        allowNull: false,
      }
});

export default User;

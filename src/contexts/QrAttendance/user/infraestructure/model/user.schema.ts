import {DataTypes} from "sequelize";
import db from '../../../../shared/infraestructure/db/mysql.connection';
import Group from "../../../group/infraestructure/model/group.schema";

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
        lastname: {
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
    }
);

User.hasMany(Group, {
    foreignKey: 'user_id'
});

Group.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'user_id'
});

export default User;

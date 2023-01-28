import {DataType, Sequelize} from 'sequelize-typescript'
import User from "../../../QrAttendance/user/infrastructure/model/user.schema";
import Group from "../../../QrAttendance/group/infrastructure/model/group.schema";

const sequelize = new Sequelize('QrAttendance', 'limber', '15891', {
    host: 'localhost',
    dialect: 'mariadb',
    // logging: false
});

// init models
const groupAttributes = {
    groupId: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false
    }
}

const userAttributes = {
    userId: {
        type: DataType.STRING,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataType.STRING
    },
    email: {
        type: DataType.STRING,
        unique: true
    },
    password: {
        type: DataType.STRING
    },
    lastname: {
        type: DataType.STRING
    },
    createdAt: {
        type: DataType.DATE,
    },
    updatedAt: {
        type: DataType.DATE,
    }
}

sequelize.addModels([User, Group]);

User.init(userAttributes, {sequelize: sequelize, tableName: "user"});
Group.init(groupAttributes, {sequelize: sequelize, tableName: "group"});

export default sequelize;

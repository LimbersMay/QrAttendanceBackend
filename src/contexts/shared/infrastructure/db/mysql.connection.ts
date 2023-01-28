import {DataType, Sequelize} from 'sequelize-typescript'
import User from "../../../QrAttendance/user/infrastructure/model/user.schema";
import Group from "../../../QrAttendance/group/infrastructure/model/group.schema";
import QrCode from "../../../QrAttendance/qr_code/infrastructure/models/qrCode.schema";

const sequelize = new Sequelize('QrAttendance', 'limber', '15891', {
    host: 'localhost',
    dialect: 'mariadb',
    // logging: false
});

// init models
const groupAttributes = {
    groupId: {
        type: DataType.STRING,
        unique: true,
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
        allowNull: false,
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

const qrCodeAttributes = {
    qrId: {
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    groupId: {
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: Group,
            key: 'groupId'
        }
    },
    ownerId: {
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
    url: {
        type: DataType.STRING,
        allowNull: false
    },
    enabled: {
        type: DataType.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        type: DataType.DATE
    },
    updatedAt: {
        type: DataType.DATE
    }
}

sequelize.addModels([User, Group, QrCode]);

User.init(userAttributes, {sequelize: sequelize, tableName: "user"});
Group.init(groupAttributes, {sequelize: sequelize, tableName: "group"});
QrCode.init(qrCodeAttributes, {sequelize: sequelize, tableName: "qrCode"});

export default sequelize;

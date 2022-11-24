import { Sequelize } from "sequelize";

export const db = new Sequelize('QrAssistance', 'root', '123456', {
    host: 'localhost',
    dialect: 'mariadb',
    // logging: false
});

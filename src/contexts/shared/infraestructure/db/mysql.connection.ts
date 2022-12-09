import { Sequelize } from "sequelize";

export default new Sequelize('QrAttendance', 'root', '123456', {
    host: 'localhost',
    dialect: 'mariadb',
    // logging: false
});


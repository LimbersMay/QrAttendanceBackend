import { Sequelize } from "sequelize";

export default new Sequelize('QrAttendance', 'limber', '15891', {
    host: 'localhost',
    dialect: 'mariadb',
   // logging: false
});



import { Sequelize } from 'sequelize-typescript'

const sequelize = new Sequelize('QrAttendance', 'limber', '15891', {
    host: 'localhost',
    dialect: 'mariadb',
    // logging: false
});

export default sequelize;

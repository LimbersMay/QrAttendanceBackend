import { Sequelize } from "sequelize";
import {dbConnection} from "../../../../shared/infraestructure/db/db.connection";

export default new Sequelize('QrAttendance', 'root', '123456', {
    host: 'localhost',
    dialect: 'mariadb',
    // logging: false
});

export class MysqlConnection implements dbConnection {
    private sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize('QrAttendance', 'root', '123456', {
            host: 'localhost',
            dialect: 'mariadb',
            // logging: false
        })
    }

    connect = (): void => {
        this.sequelize.authenticate().then()
    }

}

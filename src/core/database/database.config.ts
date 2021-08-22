import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import * as dotenv from "dotenv";

dotenv.config();

export const DatabaseConfig: MysqlConnectionOptions = {
    //type: process.env.DB_TYPE,
    type: 'mysql',
    host: process.env.DB_HOST,
    //port: process.env.DB_PORT,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
}

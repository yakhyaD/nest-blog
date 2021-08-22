//import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import * as dotenv from "dotenv";

dotenv.config();

export const DatabaseConfig: any = {
    type: process.env.DB_TYPE,
    //type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    //port: process.env.DB_PORT,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
}

import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

const CONNECTION_TYPE = 'mysql';
export const DB_CONNECTION_MACRO_DATA = 'dbMacroData';

@Injectable()
export default class MacroDataDatabaseConfigService
    implements TypeOrmOptionsFactory
{
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: CONNECTION_TYPE,
            host: process.env.DB_MACRO_HOST,
            port: +process.env.DB_MACRO_PORT,
            username: process.env.DB_MACRO_USERNAME,
            password: process.env.DB_MACRO_PASSWORD,
            database: process.env.DB_MACRO_DATA_DATABASE,
            logging: true,
        };
    }
}

// export default registerAs(
//     CONFIG_MACRO_DATA_DATABASE,
//     (): ConnectionOptions => ({
//         type: CONNECTION_TYPE,
//         host: process.env.DB_MAIN_HOST,
//         port: +process.env.DB_MAIN_PORT,
//         username: process.env.DB_MAIN_USERNAME,
//         password: process.env.DB_MAIN_PASSWORD,
//         database: process.env.DB_MACRO_DATA_DATABASE,
//         logging: true,
//     }),
// );

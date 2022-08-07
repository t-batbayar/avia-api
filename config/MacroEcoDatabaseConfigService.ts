import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

const CONNECTION_TYPE = 'mysql';
export const DB_CONNECTION_MACRO_ECO = 'dbMacroEco';

@Injectable()
export default class MacroEcoDatabaseConfigService
    implements TypeOrmOptionsFactory
{
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: CONNECTION_TYPE,
            host: process.env.DB_ECO_HOST,
            port: +process.env.DB_ECO_PORT,
            username: process.env.DB_ECO_USERNAME,
            password: process.env.DB_ECO_PASSWORD,
            database: process.env.DB_MACRO_ECO_DATABASE,
            logging: true,
        };
    }
}

import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

const CONNECTION_TYPE = 'mysql';
export const DB_CONNECTION_MAIN = 'default';

@Injectable()
export default class MainDatabaseConfigService
    implements TypeOrmOptionsFactory
{
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            name: DB_CONNECTION_MAIN,
            type: CONNECTION_TYPE,
            host: process.env.DB_MAIN_HOST,
            port: +process.env.DB_MAIN_PORT,
            username: process.env.DB_MAIN_USERNAME,
            password: process.env.DB_MAIN_PASSWORD,
            database: process.env.DB_MAIN_DATABASE,
            logging: true,
            autoLoadEntities: true,
            synchronize: process.env.ENVIRONMENT === 'dev',
        };
    }
}

// export default registerAs(
//     CONFIG_MAIN_DATABASE,
//     (): ConnectionOptions => (),
// );

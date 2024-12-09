import { MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import mikroOrmConfig from './mikro-orm.config';
export const DB_CONNECTION_MAIN = 'default';

export const DB_CONNECTION = 'default';

const mikroConfig = mikroOrmConfig;

@Injectable()
export default class MainDatabaseConfigService
    implements MikroOrmOptionsFactory
{
    createMikroOrmOptions() {
        return {
            name: DB_CONNECTION,
            debug: true,
            autoLoadEntities: false,
            ...mikroConfig,
        };
    }
}

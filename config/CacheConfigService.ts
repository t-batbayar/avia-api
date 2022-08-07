import {
    CacheModuleOptions,
    CacheOptionsFactory,
    Injectable,
} from '@nestjs/common';

export const DB_CONNECTION_MAIN = 'default';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export default class CacheConfigService implements CacheOptionsFactory {
    createCacheOptions(): CacheModuleOptions {
        return {
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
            auth_pass: process.env.REDIS_PASSWORD,
            ttl: process.env.ENVIRONMENT === 'dev' ? 0 : +process.env.CACHE_TTL,
        };
    }
}

// export default registerAs(
//     CONFIG_MAIN_DATABASE,
//     (): ConnectionOptions => (),
// );

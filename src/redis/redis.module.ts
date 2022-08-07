import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Redis from 'redis';

import { REDIS } from './redis.constants';

@Module({
    imports: [ConfigService],
    providers: [
        {
            inject: [ConfigService],
            provide: REDIS,
            useFactory: (configService: ConfigService) => {
                return Redis.createClient({
                    host: configService.get('redisConnectionConfig.host'),
                    port: configService.get('redisConnectionConfig.port'),
                    auth_pass: configService.get(
                        'redisConnectionConfig.password',
                    ),
                });
            },
        },
    ],
    exports: [REDIS],
})
export class RedisModule {}

import { registerAs } from '@nestjs/config';
import { ClientOpts } from 'redis';

export default registerAs(
    'redisConnectionConfig',
    (): ClientOpts => ({
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    }),
);

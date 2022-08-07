import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { format } from 'date-fns';
import * as fileStreamRotator from 'file-stream-rotator';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import pino from 'pino';

import cmsSessionConf from '../config/cmsSessionConfig';
import configuration from '../config/configuration';
import MainDatabaseConfig from '../config/MainDatabaseConfigService';
import { CmsModule } from './cms/cms.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { WebModule } from './web/web.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                '.env.development.local',
                '.env.development',
                '.env.local',
            ],
            load: [configuration, cmsSessionConf],
            cache: true,
            isGlobal: true,
        }),
        // CacheModule.registerAsync({
        //     imports: [ConfigModule],
        //     useClass: CacheConfigService,
        //     inject: [ConfigService],
        // }),
        // This is the "default" connection shouldn't have name property below connection
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: MainDatabaseConfig,
            inject: [ConfigService],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'public'),
            exclude: ['/api*'],
        }),
        LoggerModule.forRoot({
            pinoHttp: {
                serializers: {
                    req: (req) => {
                        req.body = req.raw.body;
                        return req;
                    },
                },
                stream: pino.multistream(
                    fileStreamRotator.getStream({
                        filename: 'var/logs/info-%DATE%.log',
                        frequency: 'daily',
                        verbose: false,
                        max_logs: 10,
                    }),
                ),
                timestamp: () => {
                    return `, "time": "${format(
                        new Date(),
                        'yyyy-MM-dd hh:mm:ss.SSS',
                    )}"`;
                },
            },
        }),
        CmsModule,
        WebModule,
        // MailModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter,
        },
    ],
})
export class AppModule {}

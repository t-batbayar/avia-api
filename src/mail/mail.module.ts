import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { CONFIG_NAME_MAIL } from '../../config/mailConfig';
import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => {
                const mailConfig = config.get(CONFIG_NAME_MAIL);
                return {
                    transport: {
                        host: mailConfig.host,
                        port: mailConfig.port,
                        auth: {
                            user: mailConfig.username,
                            pass: mailConfig.password,
                        },
                    },
                    defaults: {
                        from: `"No Reply" <${mailConfig.mailFrom}>`,
                    },
                    template: {
                        dir: join(__dirname, 'templates'),
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}

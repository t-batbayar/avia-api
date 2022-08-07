import { registerAs } from '@nestjs/config';

export const CONFIG_NAME_MAIL = 'mail';

export default registerAs(CONFIG_NAME_MAIL, () => ({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: false,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
    mailFrom: process.env.MAIL_FROM,
}));

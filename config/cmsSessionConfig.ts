import { registerAs } from '@nestjs/config';
import { SessionOptions } from 'express-session';

export const CMS_SESSION_CONFIG = 'cmsSessionConfig';

export default registerAs(
    CMS_SESSION_CONFIG,
    (): SessionOptions => ({
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: true,
        rolling: true,
        cookie: {
            path: '/',
            domain: process.env.COOKIE_DOMAIN,
            sameSite: false,
            httpOnly: false, // Don't make it true. Browser can't get cookie value
            maxAge: +process.env.CMS_COOKIE_TTL,
            secure: false,
        },
        name: 'cms_session_id',
    }),
);

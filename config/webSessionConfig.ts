import { registerAs } from '@nestjs/config';
import { SessionOptions } from 'express-session';

export default registerAs(
    'webSessionConfig',
    (): SessionOptions => ({
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
        cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: +process.env.SESSION_MAX_TTL,
        },
        name: 'web_session_id',
    }),
);

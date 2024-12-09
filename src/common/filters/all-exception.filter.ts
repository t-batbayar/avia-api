import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        @InjectPinoLogger(HttpException.name)
        private readonly logger: PinoLogger,
    ) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const { httpAdapter } = this.httpAdapterHost;
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const message = (exception as any).message;
        const code = 'HttpException';

        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        switch (exception.constructor) {
            case HttpException:
                status = (exception as HttpException).getStatus();
                break;
            default:
                status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        this.logger.error({
            message: message,
            stack: (exception as any).stack,
            request: {
                id: request.id,
                method: request.method,
                url: request.url,
            },
            exceptionStatus: status,
            errorCode: code,
        });

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            statusCode: httpStatus,
            message: message,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

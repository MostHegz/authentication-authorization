import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

export class AllExceptionsFilter implements ExceptionFilter {
    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const statusCode = exception.getStatus();

        const exceptionMessage = exception.getResponse() as {
            message: string[] | string,
            property?: string
        };

        const errorMessages = !Array.isArray(exceptionMessage.message) ? [exceptionMessage.message] : exceptionMessage.message;

        const errorResponses = [];
        for (const message of errorMessages) {
            const error = {
                message,
                property: exceptionMessage.property
            };
            errorResponses.push(error);
        }
        response.status(statusCode).json({ code: statusCode, errors: errorResponses });
    }
}

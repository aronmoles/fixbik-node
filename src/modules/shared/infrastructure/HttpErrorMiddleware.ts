import { Request, Response } from 'express';
import { ErrorMiddleware } from '../domain/framework/ErrorMiddleware';
import HttpError from '../domain/http/HttpError';
import { HttpStatus } from '../domain/http/HttpStatus';
import Logger from '../domain/Logger';

export default class HttpErrorMiddleware implements ErrorMiddleware {
    constructor(
        private readonly logger: Logger,
    ) {}

    apply(error: Error, req: Request, res: Response, next: (errorMiddleware: Error) => void): void {
        this.logger.error(`Error: ${error.message}`);
        const statusCode = error instanceof HttpError ? error.code : HttpStatus.INTERNAL_SERVER_ERROR;
        res.status(statusCode)
            .send({
                errors: {
                    title: error.message,
                },
            });
        next(error);
    }
}

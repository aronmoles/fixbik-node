import { ErrorMiddleware, ErrorMiddlewareNext } from '../domain/framework/ErrorMiddleware';
import HttpError from '../domain/http/HttpError';
import { HttpStatus } from '../domain/http/HttpStatus';
import Logger from '../domain/Logger';
import { Request } from '../domain/framework/Request';
import { Response } from '../domain/framework/Response';

export default class HttpErrorMiddleware implements ErrorMiddleware {
    constructor(
        private readonly logger: Logger,
    ) {}

    apply(error: Error, req: Request, res: Response, next: ErrorMiddlewareNext): void {
        this.logger.error(`Error: ${error.message}`);
        const statusCode = error instanceof HttpError ? error.code : HttpStatus.INTERNAL_SERVER_ERROR;
        res.status(statusCode).send({
            errors: {
                title: error.message,
            },
        });
        next(error);
    }
}

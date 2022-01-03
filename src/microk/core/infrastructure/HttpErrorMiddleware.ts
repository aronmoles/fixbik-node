import { Keys } from '../../../modules/shared/infrastructure/di/Keys';
import HttpError from '../../common/http/HttpError';
import { HttpStatus } from '../../common/http/HttpStatus';
import Logger from '../domain/Logger';
import { ErrorMiddleware, ErrorMiddlewareNext } from '../domain/ErrorMiddleware';
import { Request } from '../domain/http/Request';
import { Response } from '../domain/http/Response';
import Inject from './di/Inject.decorator';

export default class HttpErrorMiddleware implements ErrorMiddleware {
    constructor(
        @Inject(Keys.App.Logger) private readonly logger: Logger,
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

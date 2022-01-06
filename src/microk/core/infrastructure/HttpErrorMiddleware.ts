import { Keys } from '../../../modules/shared/infrastructure/di/Keys';
import HttpError from '../../common/http/HttpError';
import { HttpStatus } from '../../common/http/HttpStatus';
import Logger from '../domain/Logger';
import { ErrorMiddleware, ErrorMiddlewareNext } from '../domain/ErrorMiddleware';
import { Req } from '../domain/http/Req';
import { Res } from '../domain/http/Res';
import Inject from './di/Inject.decorator';
import ResponseContent from '../domain/http/ResponseContent';

export default class HttpErrorMiddleware implements ErrorMiddleware {
    constructor(
        @Inject(Keys.App.Logger) private readonly logger: Logger,
    ) {}

    apply(error: Error, req: Req, res: Res, next: ErrorMiddlewareNext): void {
        this.logger.error(`Error: ${error.message}`);
        const statusCode = error instanceof HttpError ? error.code : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseContent: ResponseContent = {
            error: {
                code: statusCode,
                title: error.name,
                detail: error.message,
            },
        };

        res.status(statusCode).send(responseContent);
        next(error);
    }
}

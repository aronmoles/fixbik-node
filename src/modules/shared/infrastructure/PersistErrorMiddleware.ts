import { ErrorMiddleware, ErrorMiddlewareNext } from '../domain/framework/ErrorMiddleware';
import { Request } from '../domain/framework/Request';
import { Response } from '../domain/framework/Response';
import ErrorTracker from '../domain/error/ErrorTracker';
import { TrackError } from '../domain/error/TrackError';

export default class PersistErrorMiddleware implements ErrorMiddleware {
    constructor(
        private readonly errorTracker: ErrorTracker,
    ) {}

    apply(error: Error, req: Request, res: Response, next: ErrorMiddlewareNext): void {
        if (this.errorTracker) {
            this.errorTracker.track(TrackError.fromError(error));
        }
        next(error);
    }
}

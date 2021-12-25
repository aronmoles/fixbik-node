import ErrorTracker from '../../domain/error/ErrorTracker';
import { TrackError } from '../../domain/error/TrackError';
import { ErrorMiddleware, ErrorMiddlewareNext } from '../../domain/ErrorMiddleware';
import { Request } from '../../domain/http/Request';
import { Response } from '../../domain/http/Response';

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

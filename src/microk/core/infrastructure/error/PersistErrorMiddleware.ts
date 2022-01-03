import { Keys } from '../../../../modules/shared/infrastructure/di/Keys';
import ErrorTracker from '../../domain/error/ErrorTracker';
import { TrackError } from '../../domain/error/TrackError';
import { ErrorMiddleware, ErrorMiddlewareNext } from '../../domain/ErrorMiddleware';
import { Request } from '../../domain/http/Request';
import { Response } from '../../domain/http/Response';
import Inject from '../di/Inject.decorator';

export default class PersistErrorMiddleware implements ErrorMiddleware {
    constructor(
        @Inject(Keys.App.ErrorTracker) private readonly errorTracker: ErrorTracker,
    ) {}

    apply(error: Error, req: Request, res: Response, next: ErrorMiddlewareNext): void {
        if (this.errorTracker) {
            this.errorTracker.track(TrackError.fromError(error));
        }
        next(error);
    }
}

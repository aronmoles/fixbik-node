import { Keys } from '../../../../modules/shared/infrastructure/di/Keys';
import ErrorTracker from '../../domain/error/ErrorTracker';
import { TrackError } from '../../domain/error/TrackError';
import { ErrorMiddleware, ErrorMiddlewareNext } from '../../domain/ErrorMiddleware';
import { Req } from '../../domain/http/Req';
import { Res } from '../../domain/http/Res';
import Inject from '../di/Inject.decorator';

export default class PersistErrorMiddleware implements ErrorMiddleware {
    constructor(
        @Inject(Keys.App.ErrorTracker) private readonly errorTracker: ErrorTracker,
    ) {}

    apply(error: Error, req: Req, res: Res, next: ErrorMiddlewareNext): void {
        if (this.errorTracker) {
            this.errorTracker.track(TrackError.fromError(error));
        }
        next(error);
    }
}

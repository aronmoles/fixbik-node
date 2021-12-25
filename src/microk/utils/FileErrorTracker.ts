import ErrorTracker from '../core/domain/error/ErrorTracker';
import { TrackError } from '../core/domain/error/TrackError';
import * as fs from 'fs';

export default class FileErrorTracker implements ErrorTracker {
    async track(trackError: TrackError): Promise<void> {
        fs.appendFileSync(
            'errors.log',
            JSON.stringify(trackError.toPrimitives(), null, 2),
        )
    }
}

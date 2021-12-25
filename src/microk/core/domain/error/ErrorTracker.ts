import { TrackError } from './TrackError';

export default interface ErrorTracker {
    track(trackError: TrackError): Promise<void>;
}

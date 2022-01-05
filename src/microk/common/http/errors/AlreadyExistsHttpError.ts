import HttpError from '../HttpError';
import { HttpStatus } from '../HttpStatus';

export default class AlreadyExistsHttpError extends HttpError {
    constructor(message?: string) {
        super(HttpStatus.CONFLICT, message || 'Object not found');
    }
}

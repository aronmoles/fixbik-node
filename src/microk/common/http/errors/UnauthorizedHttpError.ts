import HttpError from '../HttpError';
import { HttpStatus } from '../HttpStatus';

export default class UnauthorizedHttpError extends HttpError {
    constructor(message?: string) {
        super(HttpStatus.UNAUTHORIZED, message || 'Unauthorized');
    }
}

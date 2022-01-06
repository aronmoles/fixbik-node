import HttpError from '../HttpError';
import { HttpStatus } from '../HttpStatus';

export default class ForbiddenHttpError extends HttpError {
    constructor(message?: string) {
        super(HttpStatus.FORBIDDEN, message || 'Operation not allowed');
    }
}

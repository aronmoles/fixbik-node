import HttpError from '../HttpError';
import { HttpStatus } from '../HttpStatus';

export default class MethodNotAllowedHttpError extends HttpError {
    constructor(message?: string) {
        super(HttpStatus.METHOD_NOT_ALLOWED, message || 'Method not allowed');
    }
}

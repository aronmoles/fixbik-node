import HttpError from '../HttpError';
import { HttpStatus } from '../HttpStatus';

export default class BadRequestHttpError extends HttpError {
    constructor(message?: string) {
        super(HttpStatus.BAD_REQUEST, message || 'Bad request');
    }
}

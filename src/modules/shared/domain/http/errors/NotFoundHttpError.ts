import HttpError from '../HttpError';
import { HttpStatus } from '../HttpStatus';

export default class NotFoundHttpError extends HttpError {
    constructor(message?: string) {
        super(HttpStatus.NOT_FOUND, message || 'Object not found');
        // TODO I18n
    }
}

import { HttpStatus } from './HttpStatus';

export default class HttpError extends Error {
    constructor(
        private readonly _code: HttpStatus,
        message: string,
    ) {
        super(message);
    }

    get code(): HttpStatus {
        return this._code;
    }
}

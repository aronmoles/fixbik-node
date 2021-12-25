import { HttpStatus } from '../http/HttpStatus';
import { PrimitiveType } from '../PrimitiveType';
import HttpError from '../http/HttpError';

export class TrackError {
    static fromError(error: Error): TrackError {
        return new TrackError(
            new Date(),
            error.constructor.name,
            error.message,
            error instanceof HttpError ? error.code : HttpStatus.INTERNAL_SERVER_ERROR,
            error.stack,
        )
    }

    private constructor(
        private readonly occurredOn: Date,
        private readonly name: string,
        private readonly message: string,
        private readonly httpStatus: HttpStatus,
        private readonly stack: string,
    ) {
    }

    public toPrimitives(): Record<string, PrimitiveType> {
        return {
            occurredOn: this.occurredOn.toISOString(),
            name: this.name,
            message: this.message,
            httpStatus: this.httpStatus,
            stack: this.stack,
        }
    }
}

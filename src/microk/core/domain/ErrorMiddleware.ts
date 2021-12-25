import { Request } from './http/Request';
import { Response } from './http/Response';

export type ErrorMiddlewareNext = (error: Error) => void;

export interface ErrorMiddleware {
    apply(error: Error, req: Request, res: Response, next: ErrorMiddlewareNext): void;
}

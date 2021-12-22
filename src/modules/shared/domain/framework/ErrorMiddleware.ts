import { Request } from './Request';
import { Response } from './Response';

export type ErrorMiddlewareNext = (error: Error) => void;

export interface ErrorMiddleware {
    apply(error: Error, req: Request, res: Response, next: ErrorMiddlewareNext): void;
}

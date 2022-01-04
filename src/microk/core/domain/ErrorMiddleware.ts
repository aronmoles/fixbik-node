import { Req } from './http/Req';
import { Res } from './http/Res';

export type ErrorMiddlewareNext = (error: Error) => void;

export interface ErrorMiddleware {
    apply(error: Error, req: Req, res: Res, next: ErrorMiddlewareNext): void;
}

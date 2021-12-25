import { Request } from './http/Request';
import { Response } from './http/Response';

export type MiddlewareNext = () => void;

export interface Middleware {
    apply(req: Request, res: Response, next: MiddlewareNext): void;
}

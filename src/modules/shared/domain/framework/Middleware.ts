import { Request } from './Request';
import { Response } from './Response';

export type MiddlewareNext = () => void;

export interface Middleware {
    apply(req: Request, res: Response, next: MiddlewareNext): void;
}

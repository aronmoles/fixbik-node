import { Req } from './http/Req';
import { Res } from './http/Res';

export type MiddlewareNext = () => void;

export interface Middleware {
    apply(req: Req, res: Res, next: MiddlewareNext): void;
}

import { Request, Response } from 'express';

export type MiddlewareNext = () => void;

export interface Middleware {
    apply(req: Request, res: Response, next: MiddlewareNext): void;
}

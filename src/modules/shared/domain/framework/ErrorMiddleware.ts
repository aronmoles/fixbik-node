import { Request, Response } from 'express';

export interface ErrorMiddleware {
    apply(error: Error, req: Request, res: Response, next: (error: Error) => void): void;
}

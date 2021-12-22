import { Request, Response } from 'express';
import { Middleware, MiddlewareNext } from '../domain/framework/Middleware';
import Logger from '../domain/Logger';

export default class TimeMiddleware implements Middleware {
    constructor(private readonly logger: Logger) {}

    apply(req: Request, res: Response, next: MiddlewareNext): void {
        const startTimestamp = Date.now();
        next();
        const endTimestamp = Date.now();
        this.logger.info(`Time: ${endTimestamp - startTimestamp}ms`);
    }
}

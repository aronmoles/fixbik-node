import { Request, Response } from 'express';
import { Middleware, MiddlewareNext } from '../../shared/domain/framework/Middleware';
import UnauthorizedHttpError from '../../shared/domain/http/errors/UnauthorizedHttpError';

export default class AuthMiddleware implements Middleware {
    apply(req: Request, res: Response, next: MiddlewareNext): void {
        if (req.header('Authorization')) {
            next();
        } else {
            throw new UnauthorizedHttpError('Authorization header not found');
        }
    }
}

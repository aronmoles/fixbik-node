import UnauthorizedHttpError from '../../../microk/common/http/errors/UnauthorizedHttpError';
import { Middleware, MiddlewareNext } from '../../../microk/core/domain/Middleware';
import { Request } from '../../../microk/core/domain/http/Request';
import { Response } from '../../../microk/core/domain/http/Response';

export default class AuthMiddleware implements Middleware {
    apply(req: Request, res: Response, next: MiddlewareNext): void {
        if (req.header('Authorization')) {
            next();
        } else {
            // TODO
            throw new UnauthorizedHttpError('Authorization header not found');
        }
    }
}

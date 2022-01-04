import UnauthorizedHttpError from '../../../microk/common/http/errors/UnauthorizedHttpError';
import { Middleware, MiddlewareNext } from '../../../microk/core/domain/Middleware';
import { Req } from '../../../microk/core/domain/http/Req';
import { Res } from '../../../microk/core/domain/http/Res';

export default class AuthMiddleware implements Middleware {
    apply(req: Req, res: Res, next: MiddlewareNext): void {
        if (req.header('Authorization')) {
            next();
        } else {
            // TODO
            throw new UnauthorizedHttpError('Authorization header not found');
        }
    }
}

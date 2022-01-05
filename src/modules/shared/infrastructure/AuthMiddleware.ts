import UnauthorizedHttpError from '../../../microk/common/http/errors/UnauthorizedHttpError';
import { Middleware, MiddlewareNext } from '../../../microk/core/domain/Middleware';
import { Req } from '../../../microk/core/domain/http/Req';
import { Res } from '../../../microk/core/domain/http/Res';
import Inject from '../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from './di/Keys';
import AuthTokenRepository from '../../auth/domain/AuthTokenRepository';
import { isNullOrUndefined } from '../../../microk/core/infrastructure/Utils';
import AuthToken from '../../auth/domain/AuthToken';

export default class AuthMiddleware implements Middleware {
    constructor(
        @Inject(Keys.Auth.AuthTokenRepository) private readonly authTokenRepository: AuthTokenRepository,
    ) {
    }

    apply(req: Req, res: Res, next: MiddlewareNext): void {
        const authorizationHeader = req.header('Authorization');
        if (isNullOrUndefined(authorizationHeader)) {
            throw new UnauthorizedHttpError('Authorization header not found');
        }
        const data = this.authTokenRepository.decode(AuthToken.fromString(authorizationHeader))
        if (!data.authUserId) {
            throw new UnauthorizedHttpError('Invalid token');
        }
        req.auth = data;
        next();
    }
}

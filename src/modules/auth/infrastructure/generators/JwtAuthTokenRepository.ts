import { Keys } from '../../../shared/infrastructure/di/Keys';
import FixBikeJwtPayload from '../../../shared/infrastructure/FixBikeJwtPayload';
import AuthToken from '../../domain/AuthToken';
import AuthTokenRepository from '../../domain/AuthTokenRepository';
import { AuthUser } from '../../domain/AuthUser';
import jwt from 'jsonwebtoken';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import Env from '../../../../microk/core/domain/env/Env';
import { FixBikEnvType } from '../../../../app/FixBikEnv';


export default class JwtAuthTokenRepository implements AuthTokenRepository {
    constructor(
        @Inject(Keys.App.Env) private readonly env: Env<FixBikEnvType>,
    ) {
    }

    generate(authUser: AuthUser): AuthToken {
        const jwtPayload: FixBikeJwtPayload = {
            authUserId: authUser.id.toString(),
        };
        const token = jwt.sign(jwtPayload, this.env.get('JWT_SECRET'));
        return AuthToken.fromString(token);
    }
}

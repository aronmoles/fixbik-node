import Env from '@microk/core/domain/Env';
import { EnvKey } from '../../../../app/ProcessEnv';
import FixBikeJwtPayload from '../../../shared/infrastructure/FixBikeJwtPayload';
import AuthToken from '../../domain/AuthToken';
import AuthTokenRepository from '../../domain/AuthTokenRepository';
import { AuthUser } from '../../domain/AuthUser';
import jwt from 'jsonwebtoken';


export default class JwtAuthTokenRepository implements AuthTokenRepository {
    constructor(
        private readonly env: Env<EnvKey>,
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

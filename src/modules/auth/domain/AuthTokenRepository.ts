import AuthToken from './AuthToken';
import { AuthUser } from './AuthUser';
import FixBikeJwtPayload from '../../shared/infrastructure/FixBikeJwtPayload';

export default interface AuthTokenRepository {
    generate(authUser: AuthUser): AuthToken,
    decode(authToken: AuthToken): FixBikeJwtPayload,
}

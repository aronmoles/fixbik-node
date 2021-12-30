import AuthToken from './AuthToken';
import { AuthUser } from './AuthUser';

export default interface AuthTokenRepository {
    generate(authUser: AuthUser): AuthToken,
}

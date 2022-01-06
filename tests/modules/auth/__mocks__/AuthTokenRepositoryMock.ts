import AuthToken from '../../../../src/modules/auth/domain/AuthToken';
import AuthTokenRepository from '../../../../src/modules/auth/domain/AuthTokenRepository';
import { AuthUser } from '../../../../src/modules/auth/domain/AuthUser';
import AuthTokenMother from '../domain/AuthTokenMother';
import FixBikeJwtPayload from '../../../../src/modules/shared/infrastructure/FixBikeJwtPayload';
import AuthUserIdMother from '../domain/AuthUserIdMother';

export default class AuthTokenRepositoryMock implements AuthTokenRepository {
    constructor() {
    }

    generate(authUser: AuthUser): AuthToken {
        return AuthTokenMother.random();
    }

    decode(authToken: AuthToken): FixBikeJwtPayload {
        return {
            authUserId: AuthUserIdMother.random().toString(),
        };
    }
}

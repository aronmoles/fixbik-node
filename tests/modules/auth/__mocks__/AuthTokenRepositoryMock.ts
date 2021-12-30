import AuthToken from '../../../../src/modules/auth/domain/AuthToken';
import AuthTokenRepository from '../../../../src/modules/auth/domain/AuthTokenRepository';
import { AuthUser } from '../../../../src/modules/auth/domain/AuthUser';
import AuthTokenMother from '../domain/AuthTokenMother';

export default class AuthTokenRepositoryMock implements AuthTokenRepository {
    constructor() {
    }

    generate(authUser: AuthUser): AuthToken {
        return AuthTokenMother.random();
    }
}

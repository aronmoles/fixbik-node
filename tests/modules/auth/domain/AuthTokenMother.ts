import AuthToken from '../../../../src/modules/auth/domain/AuthToken';
import { TokenMother } from '../../shared/domain/TokenMother';

export default class AuthTokenMother {
    static random(): AuthToken {
        return AuthToken.fromString(TokenMother.random());
    }
}

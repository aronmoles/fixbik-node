import AuthenticateQuery from '../../../../src/modules/auth/application/login/AuthenticateQuery';
import { EmailMother } from '../../shared/domain/EmailMother';
import { PasswordMother } from '../../shared/domain/PasswordMother';

export default class AuthenticateQueryMother {
    static random(): AuthenticateQuery {
        return new AuthenticateQuery(
            EmailMother.random(),
            PasswordMother.random(),
        )
    }
}

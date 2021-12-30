import AuthenticateQuery from '../../../../src/modules/auth/application/login/AuthenticateQuery';
import AuthUserEmailMother from '../domain/AuthUserEmailMother';
import AuthUserPasswordMother from '../domain/AuthUserPasswordMother';

export default class AuthenticateQueryMother {
    static random(): AuthenticateQuery {
        return new AuthenticateQuery(
            AuthUserEmailMother.random(),
            AuthUserPasswordMother.random(),
        )
    }
}

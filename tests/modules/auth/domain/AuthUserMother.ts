import AuthenticateQuery from '../../../../src/modules/auth/application/login/AuthenticateQuery';
import { AuthUser } from '../../../../src/modules/auth/domain/AuthUser';
import AuthUserEmail from '../../../../src/modules/auth/domain/AuthUserEmail';
import AuthUserId from '../../../../src/modules/auth/domain/AuthUserId';
import AuthUserPassword from '../../../../src/modules/auth/domain/AuthUserPassword';
import AuthUserEmailMother from './AuthUserEmailMother';
import AuthUserIdMother from './AuthUserIdMother';
import AuthUserPasswordMother from './AuthUserPasswordMother';

export default class AuthUserMother {
    static create(
        id: AuthUserId,
        email: AuthUserEmail,
        password: AuthUserPassword,
    ): AuthUser {
        return new AuthUser(id, email, password, undefined);
    }

    static fromQuery(query: AuthenticateQuery): AuthUser {
        return this.create(
            AuthUserIdMother.random(),
            new AuthUserEmail(query.email),
            new AuthUserPassword(query.password),
        )
    }

    static random(): AuthUser {
        return this.create(
            AuthUserIdMother.random(),
            AuthUserEmailMother.random(),
            AuthUserPasswordMother.random()
        );
    }
}

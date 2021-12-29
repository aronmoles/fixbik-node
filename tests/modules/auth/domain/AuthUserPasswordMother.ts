import AuthUserPassword from '../../../../src/modules/auth/domain/AuthUserPassword';
import { PasswordMother } from '../../shared/domain/PasswordMother';

export default class AuthUserPasswordMother {
    static create(value: string): AuthUserPassword {
        return new AuthUserPassword(value);
    }

    static random(): AuthUserPassword {
        return this.create(PasswordMother.random());
    }
}

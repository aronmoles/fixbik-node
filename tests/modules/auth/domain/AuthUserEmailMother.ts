import AuthUserEmail from '../../../../src/modules/auth/domain/AuthUserEmail';
import { EmailMother } from '../../shared/domain/EmailMother';

export default class AuthUserEmailMother {
    static create(value: string): AuthUserEmail {
        return new AuthUserEmail(value);
    }

    static random(): AuthUserEmail {
        return this.create(EmailMother.random());
    }
}

import AuthUserId from '../../../../src/modules/auth/domain/AuthUserId';
import { UuidMother } from '../../shared/domain/UuidMother';

export default class AuthUserIdMother {
    static create(value: string): AuthUserId {
        return AuthUserId.fromString(value);
    }

    static random(): AuthUserId {
        return this.create(UuidMother.random());
    }
}

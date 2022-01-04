import AuthUserAuthenticatedDomainEvent from './AuthUserAuthenticated.DomainEvent';
import AuthUserEmail from './AuthUserEmail';
import AuthUserId from './AuthUserId';
import AuthUserIncorrectPasswordError from './AuthUserIncorrectPasswordError';
import AuthUserPassword from './AuthUserPassword';
import AuthUserRecoverPasswordToken from './AuthUserRecoverPasswordToken';
import { AggregateRoot } from '../../../microk/common/AggregateRoot';
import { PrimitivesObject } from '../../../microk/common/PrimitiveType';
import { Nullable } from '../../../microk/common/Nullable';

export class AuthUser extends AggregateRoot {
    constructor(
        readonly id: AuthUserId,
        readonly email: AuthUserEmail,
        readonly password: AuthUserPassword,
        readonly recoverPasswordToken: Nullable<AuthUserRecoverPasswordToken>,
    ) {
        super();
    }

    toPrimitives(): PrimitivesObject {
        return {
            id: this.id.value(),
            email: this.email.value(),
            password: this.password.value(),
            recoverPasswordToken: this.recoverPasswordToken?.value(),
        };
    }

    authenticate(password: AuthUserPassword) {
        if (!this.password.equals(password)) {
            throw new AuthUserIncorrectPasswordError();
        }
        this.record(new AuthUserAuthenticatedDomainEvent(this))
    }
}

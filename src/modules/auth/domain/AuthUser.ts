import { AggregateRoot } from '@microk/common/AggregateRoot';
import { PrimitivesObject } from '@microk/common/PrimitiveType';
import AuthUserEmail from './AuthUserEmail';
import AuthUserId from './AuthUserId';
import AuthUserPassword from './AuthUserPassword';
import AuthUserRecoverPasswordToken from './AuthUserRecoverPasswordToken';

export class AuthUser extends AggregateRoot {
    constructor(
        readonly id: AuthUserId,
        readonly email: AuthUserEmail,
        readonly password: AuthUserPassword,
        readonly recoverPasswordToken?: AuthUserRecoverPasswordToken,
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
}

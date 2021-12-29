import { StringValueObject } from '@microk/common/value-object/StringValueObject';

export default class AuthUserRecoverPasswordToken extends StringValueObject {
    constructor(value: string) {
        super(value);
    }
}

import { StringValueObject } from '../../../microk/common/value-object/StringValueObject';

export default class AuthToken extends StringValueObject {
    private constructor(value: string) {
        super(value);
    }

    static fromString(token: string): AuthToken {
        return new this(token);
    }
}

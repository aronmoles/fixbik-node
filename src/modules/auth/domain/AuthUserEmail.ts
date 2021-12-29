import { StringValueObject } from '@microk/common/value-object/StringValueObject';

export default class AuthUserEmail extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureIsValidEmail();
    }

    private ensureIsValidEmail() {
        // TODO
    }
}

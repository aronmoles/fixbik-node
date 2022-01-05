import Uuid from '../../../microk/common/value-object/Uuid';

export default class AuthUserId extends Uuid {
    constructor(value: string) {
        super(value);
    }

    static fromString(authUserId: string): AuthUserId {
        return new AuthUserId(authUserId);
    }
}

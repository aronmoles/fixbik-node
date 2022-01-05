import Uuid from '../../../microk/common/value-object/Uuid';

export default class AuthUserId extends Uuid {
    static fromString(authUserId: string): AuthUserId {
        return new AuthUserId(authUserId);
    }
}

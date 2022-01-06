import Uuid from '../../../microk/common/value-object/Uuid';

export default class FixId extends Uuid {
    static fromString(id: string): FixId {
        return new FixId(id);
    }
}

import Uuid from '../../../microk/common/value-object/Uuid';

export default class BikeId extends Uuid {
    constructor(value: string) {
        super(value);
    }

    static fromString(id: string) {
        return new BikeId(id);
    }
}

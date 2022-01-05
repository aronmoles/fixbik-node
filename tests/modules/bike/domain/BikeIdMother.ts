import BikeId from '../../../../src/modules/bike/domain/BikeId';
import { UuidMother } from '../../shared/domain/UuidMother';

export default class BikeIdMother {
    static create(id: string): BikeId {
        return BikeId.fromString(id);
    }

    static random(): BikeId {
        return this.create(UuidMother.random())
    }
}

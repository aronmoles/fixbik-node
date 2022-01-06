import { UuidMother } from '../../../shared/domain/UuidMother';
import BikeDetailQuery from '../../../../../src/modules/bike/application/detail/BikeDetailQuery';

export default class BikeDetailQueryMother {
    static random(): BikeDetailQuery {
        return new BikeDetailQuery(
            UuidMother.random(),
            UuidMother.random(),
        )
    }
}

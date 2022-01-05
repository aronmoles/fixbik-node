import { UuidMother } from '../../../shared/domain/UuidMother';
import BikeListQuery from '../../../../../src/modules/bike/application/list/BikeListQuery';

export default class BikeListQueryMother {
    static random(): BikeListQuery {
        return new BikeListQuery(
            UuidMother.random(),
        )
    }
}

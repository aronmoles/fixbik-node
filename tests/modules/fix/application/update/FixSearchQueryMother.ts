import { UuidMother } from '../../../shared/domain/UuidMother';
import { WordMother } from '../../../shared/domain/WordMother';
import FixSearchQuery from '../../../../../src/modules/fix/application/search/FixSearchQuery';

export default class FixSearchQueryMother {
    static random(): FixSearchQuery {
        return new FixSearchQuery(
            WordMother.random(),
            UuidMother.random(),
        )
    }
}

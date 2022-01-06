import { QueryHandler } from '../../../../microk/cqrs/domain/query/QueryHandler';
import FixSearchQuery from './FixSearchQuery';
import FixDto from '../../infrastructure/dto/FixDto';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import FixSearch from './FixSearch';

export default class FixSearchQueryHandler extends QueryHandler<FixSearchQuery, FixDto[]> {
    constructor(
        @Inject(Keys.Fix.FixSearch) private readonly fixSearch: FixSearch,
    ) {
        super(FixSearchQuery);
    }

    async handle(query: FixSearchQuery): Promise<FixDto[]> {
        const fixList = await this.fixSearch.run(query.search, query.userId);
        return fixList.map(FixDto.fromFix)
    }
}

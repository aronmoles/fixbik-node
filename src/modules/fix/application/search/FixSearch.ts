import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import FixRepository from '../../domain/FixRepository';
import Fix from '../../domain/Fix';
import FixSearchCriteriaFactory from './FixSearchCriteriaFactory';

export default class FixSearch {
    constructor(
        @Inject(Keys.Fix.FixRepository) private readonly fixRepository: FixRepository,
    ) {
    }

    async run(search: string, userId: string): Promise<Fix[]> {
        const criteria = FixSearchCriteriaFactory.create(search, userId)
        return this.fixRepository.searchByCriteria(criteria)
    }
}

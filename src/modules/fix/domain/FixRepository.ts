import Fix from './Fix';
import FixId from './FixId';
import { Nullable } from '../../../microk/common/Nullable';
import { Criteria } from '../../../microk/common/criteria/Criteria';

export default interface FixRepository {
    save(fix: Fix): Promise<void>

    delete(id: FixId): Promise<void>

    search(id: FixId): Promise<Nullable<Fix>>

    searchByCriteria(criteria: Criteria): Promise<Fix[]>
}

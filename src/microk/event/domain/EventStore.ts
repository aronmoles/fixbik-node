import DomainEvent from './DomainEvent';
import { Criteria } from '../../common/criteria/Criteria';

export default interface EventStore {
    save(event: DomainEvent): Promise<void>,
    searchByCriteria(criteria: Criteria): Promise<DomainEvent[]>;
    countAll(): Promise<number>;
}

import DomainEvent from './DomainEvent';

export default interface EventStore {
    save(event: DomainEvent): Promise<void>,
}

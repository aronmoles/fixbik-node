import DomainEvent from '../messages/DomainEvent';

export default interface EventBus {
    publish(events: DomainEvent[]): Promise<void>;
}

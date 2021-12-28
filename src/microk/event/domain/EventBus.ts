import DomainEvent from './DomainEvent';

export default interface EventBus {
    publish(events: DomainEvent[]): Promise<void>;
    start(): Promise<void>;
}

import DomainEvent, { DomainEventClass } from './DomainEvent';

export default abstract class EventSubscriber<E extends DomainEvent> {
    private readonly _domainEventClasses: DomainEventClass[];

    protected constructor(...domainEventClasses: DomainEventClass[]) {
        this._domainEventClasses = domainEventClasses;
    }

    public subscribedTo(): DomainEventClass[] {
        return this._domainEventClasses;
    }

    public abstract dispatch(event: E): void;
}

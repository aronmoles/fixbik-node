import DomainEvent, { DomainEventClass } from '../messages/DomainEvent';

export default abstract class DomainEventSubscriber<E extends DomainEvent> {
    private readonly _domainEventClasses: DomainEventClass[];

    protected constructor(...domainEventClasses: DomainEventClass[]) {
        this._domainEventClasses = domainEventClasses;
    }

    public subscribedTo(): DomainEventClass[] {
        return this._domainEventClasses;
    }

    public abstract dispatch(event: E): void;
}

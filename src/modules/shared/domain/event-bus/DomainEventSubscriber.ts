import DomainEvent, { DomainEventClass } from '../messages/DomainEvent';
import MessageName from '../messages/MessageName';

export default abstract class DomainEventSubscriber<E extends DomainEvent> {
    private readonly _eventNames: MessageName[];

    protected constructor(...domainEvents: DomainEventClass[]) {
        this._eventNames = domainEvents.map((domainEvent) => domainEvent.EVENT_NAME);
    }

    public subscribedTo(): MessageName[] {
        return this._eventNames;
    }

    public abstract dispatch(event: E): void;
}

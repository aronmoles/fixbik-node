import DomainEvent, { DomainEventClass } from '../../domain/messages/DomainEvent';
import DomainEventSubscriber from '../../domain/event-bus/DomainEventSubscriber';
import { Optional } from '../../domain/Optional';

type Mapping = Map<string, DomainEventClass>;

export class DomainEventClassMapper {
    private mapping: Mapping;

    constructor(mapping: DomainEventSubscriber<DomainEvent>[]) {
        this.mapping = mapping.reduce(this.eventsExtractor(), new Map<string, DomainEventClass>());
    }

    private eventsExtractor() {
        return (map: Mapping, subscriber: DomainEventSubscriber<DomainEvent>) => {
            subscriber.subscribedTo().forEach((domainEventClass) => {
                map.set(domainEventClass.EVENT_NAME.value(), domainEventClass);
            });
            return map;
        };
    }

    for(name: string): Optional<DomainEventClass> {
        const domainEvent = this.mapping.get(name);

        if (!domainEvent) {
            return undefined;
        }

        return domainEvent;
    }
}

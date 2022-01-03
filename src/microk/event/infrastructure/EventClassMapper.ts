import { Optional } from '../../common/Optional';
import { ContainerTag } from '../../core/domain/di/ContainerTag';
import InjectTag from '../../core/infrastructure/di/InjecTag.decorator';
import DomainEvent, { DomainEventClass } from '../domain/DomainEvent';
import EventSubscriber from '../domain/EventSubscriber';

type Mapping = Map<string, DomainEventClass>;

export class EventClassMapper {
    private mapping: Mapping;

    constructor(
        @InjectTag(ContainerTag.EVENT_SUBSCRIBER) mapping: EventSubscriber<DomainEvent>[],
    ) {
        this.mapping = mapping.reduce(this.eventsExtractor(), new Map<string, DomainEventClass>());
    }

    private eventsExtractor() {
        return (map: Mapping, subscriber: EventSubscriber<DomainEvent>) => {
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

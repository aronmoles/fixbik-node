import DomainEvent from '../domain/DomainEvent';
import EventDeserializer from '../domain/EventDeserializer';
import { EventClassMapper } from './EventClassMapper';
import { Optional } from '../../common/Optional';

export class EventJsonDeserializer implements EventDeserializer {
    private mapping: EventClassMapper;

    constructor(mapping: EventClassMapper) {
        this.mapping = mapping;
    }

    deserialize(eventString: string): Optional<DomainEvent> {
        const event = JSON.parse(eventString);
        const eventData = event.data;
        const eventMeta = event.meta;
        const eventName = eventData.name;
        const eventClass = this.mapping.for(eventName);

        if (!eventClass) {
            return undefined;
        }

        return eventClass.fromPrimitives({
            id: eventData.id,
            name: eventData.name,
            type: eventData.type,
            aggregateId: eventData.aggregateId,
            occurredOn: eventData.occurredOn,
            eventMeta,
        });
    }
}

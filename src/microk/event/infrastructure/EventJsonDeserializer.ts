import DomainEvent from '../domain/DomainEvent';
import { EventClassMapper } from './EventClassMapper';
import { Optional } from '../../common/Optional';

export class EventJsonDeserializer {
    private mapping: EventClassMapper;

    constructor(mapping: EventClassMapper) {
        this.mapping = mapping;
    }

    deserialize(event: string): Optional<DomainEvent> {
        const eventData = JSON.parse(event).data;
        const eventMeta = JSON.parse(event).meta;
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

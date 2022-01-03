import { Keys } from '../../../modules/shared/infrastructure/di/Keys';
import { Optional } from '../../common/Optional';
import Inject from '../../core/infrastructure/di/Inject.decorator';
import DomainEvent from '../domain/DomainEvent';
import EventDeserializer from '../domain/EventDeserializer';
import { EventClassMapper } from './EventClassMapper';

export class EventJsonDeserializer implements EventDeserializer {
    private mapping: EventClassMapper;

    constructor(
        @Inject(Keys.CQRS.EventClassMapper) mapping: EventClassMapper
    ) {
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

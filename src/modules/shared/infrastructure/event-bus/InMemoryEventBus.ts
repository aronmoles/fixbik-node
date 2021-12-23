import EventBus from '../../domain/event-bus/EventBus';
import DomainEvent from '../../domain/messages/DomainEvent';
import { DomainEventSubscriberMapper } from './DomainEventSubscriberMapper';

export default class InMemoryEventBus implements EventBus {
    constructor(private domainEventSubscriberMapper: DomainEventSubscriberMapper) {
    }

    async publish(events: DomainEvent[]): Promise<void> {
        for (const event of events) {
            this.domainEventSubscriberMapper.search(event.name)
                .forEach((subscriber) => {
                    subscriber.dispatch(event)
                })
        }
    }
}

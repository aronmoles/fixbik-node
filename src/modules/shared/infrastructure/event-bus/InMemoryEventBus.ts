import EventBus from '../../domain/event-bus/EventBus';
import DomainEvent from '../../domain/messages/DomainEvent';
import { Mapper } from '../../domain/Mapper';
import DomainEventSubscriber from '../../domain/event-bus/DomainEventSubscriber';
import MessageName from '../../domain/messages/MessageName';

export default class InMemoryEventBus implements EventBus {
    private domainEventSubscriberMapper: Mapper<MessageName, Array<DomainEventSubscriber<DomainEvent>>>;

    attachMapper(domainEventSubscriberMapper: Mapper<MessageName, Array<DomainEventSubscriber<DomainEvent>>>): void {
        this.domainEventSubscriberMapper = domainEventSubscriberMapper;
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

import { Mapper } from '../../common/Mapper';
import DomainEvent from '../domain/DomainEvent';
import EventBus from '../domain/EventBus';
import MessageName from '../../common/message/MessageName';
import EventSubscriber from '../domain/EventSubscriber';

export default class InMemoryEventBus implements EventBus {
    private domainEventSubscriberMapper: Mapper<MessageName, Array<EventSubscriber<DomainEvent>>>;

    attachMapper(domainEventSubscriberMapper: Mapper<MessageName, Array<EventSubscriber<DomainEvent>>>): void {
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

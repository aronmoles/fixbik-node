import { Mapper } from '../../common/Mapper';
import MessageName from '../../common/message/MessageName';
import DomainEvent from '../domain/DomainEvent';
import EventBus from '../domain/EventBus';
import EventSubscriber from '../domain/EventSubscriber';

export default class InMemoryEventBus implements EventBus {
    constructor(
        private readonly domainEventSubscriberMapper: Mapper<MessageName, Array<EventSubscriber<DomainEvent>>>,
    ) {
    }

    async publish(events: DomainEvent[]): Promise<void> {
        for (const event of events) {
            this.domainEventSubscriberMapper.search(event.name)
                .forEach((subscriber) => {
                    subscriber.dispatch(event)
                })
        }
    }

    async start(): Promise<void> {
    }
}

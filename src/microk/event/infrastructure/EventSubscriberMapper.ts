import { Mapper } from '../../common/Mapper';
import MessageName from '../../common/message/MessageName';
import DomainEvent from '../domain/DomainEvent';
import EventSubscriber from '../domain/EventSubscriber';

export class EventSubscriberMapper implements Mapper<MessageName, EventSubscriber<DomainEvent>[]> {
    private domainEventSubscribersMap: Map<string, Array<EventSubscriber<DomainEvent>>>;

    constructor(domainEventSubscribers: Array<EventSubscriber<DomainEvent>>) {
        this.domainEventSubscribersMap = this.formatEventSubscribers(domainEventSubscribers);
    }

    private formatEventSubscribers(
        domainEventSubscribers: Array<EventSubscriber<DomainEvent>>,
    ): Map<string, Array<EventSubscriber<DomainEvent>>> {
        const domainEventSubscribersMap = new Map<string, Array<EventSubscriber<DomainEvent>>>();

        domainEventSubscribers.forEach((domainEventSubscriber) => {
            domainEventSubscriber.subscribedTo().forEach((domainEventClass) => {
                let domainEventSubscribersInMap = domainEventSubscribersMap.get(domainEventClass.EVENT_NAME.value());
                if (!domainEventSubscribersInMap) {
                    domainEventSubscribersInMap = [];
                }
                domainEventSubscribersInMap.push(domainEventSubscriber)
                domainEventSubscribersMap.set(domainEventClass.EVENT_NAME.value(), domainEventSubscribersInMap)
            })
        });

        return domainEventSubscribersMap;
    }

    public search(messageName: MessageName): Array<EventSubscriber<DomainEvent>> {
        const domainEventSubscribers = this.domainEventSubscribersMap.get(messageName.value());

        if (!domainEventSubscribers) {
            return [];
        }

        return domainEventSubscribers;
    }
}

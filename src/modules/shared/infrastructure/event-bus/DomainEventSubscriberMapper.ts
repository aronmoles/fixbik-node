import DomainEventSubscriber from '../../domain/event-bus/DomainEventSubscriber';
import DomainEvent from '../../domain/messages/DomainEvent';
import MessageName from '../../domain/messages/MessageName';

export class DomainEventSubscriberMapper {
    private domainEventSubscribersMap: Map<string, Array<DomainEventSubscriber<DomainEvent>>>;

    constructor(domainEventSubscribers: Array<DomainEventSubscriber<DomainEvent>>) {
        this.domainEventSubscribersMap = this.formatDomainEventSubscribers(domainEventSubscribers);
    }

    private formatDomainEventSubscribers(
        domainEventSubscribers: Array<DomainEventSubscriber<DomainEvent>>,
    ): Map<string, Array<DomainEventSubscriber<DomainEvent>>> {
        const domainEventSubscribersMap = new Map<string, Array<DomainEventSubscriber<DomainEvent>>>();

        domainEventSubscribers.forEach((domainEventSubscriber) => {
            domainEventSubscriber.subscribedTo().forEach((messageName) => {
                let domainEventSubscribersInMap = domainEventSubscribersMap.get(messageName.value());
                if (!domainEventSubscribersInMap) {
                    domainEventSubscribersInMap = [];
                }
                domainEventSubscribersInMap.push(domainEventSubscriber)
                domainEventSubscribersMap.set(messageName.value(), domainEventSubscribersInMap)
            })
        });

        return domainEventSubscribersMap;
    }

    public search(messageName: MessageName): Array<DomainEventSubscriber<DomainEvent>> {
        const domainEventSubscribers = this.domainEventSubscribersMap.get(messageName.value());

        if (!domainEventSubscribers) {
            return [];
        }

        return domainEventSubscribers;
    }
}

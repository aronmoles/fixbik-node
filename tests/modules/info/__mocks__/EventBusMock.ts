import { Mapper } from '@microk/common/Mapper';
import MessageName from '@microk/common/message/MessageName';
import DomainEvent from '@microk/event/domain/DomainEvent';
import EventBus from '@microk/event/domain/EventBus';
import EventSubscriber from '@microk/event/domain/EventSubscriber';

export default class EventBusMock implements EventBus {
    private publishSpy = jest.fn();

    async publish(events: DomainEvent[]) {
        this.publishSpy(events);
    }

    attachMapper(domainEventSubscriberMapper: Mapper<MessageName, Array<EventSubscriber<DomainEvent>>>): void {
    }

    hasBeenPublishedEvent() {
        expect(this.publishSpy).toHaveBeenCalled();
    }
}

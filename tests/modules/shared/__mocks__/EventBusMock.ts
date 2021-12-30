import DomainEvent from '@microk/event/domain/DomainEvent';
import EventBus from '@microk/event/domain/EventBus';

export default class EventBusMock implements EventBus {
    private publishSpy = jest.fn();

    async publish(events: DomainEvent[]) {
        this.publishSpy(events);
    }

    hasBeenPublishedEvent() {
        expect(this.publishSpy).toHaveBeenCalled();
    }

    async start(): Promise<void> {
    }
}

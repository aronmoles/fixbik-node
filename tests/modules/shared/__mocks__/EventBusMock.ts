import DomainEvent from '../../../../src/microk/event/domain/DomainEvent';
import EventBus from '../../../../src/microk/event/domain/EventBus';

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

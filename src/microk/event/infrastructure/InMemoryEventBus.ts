import { Mapper } from '../../common/Mapper';
import MessageName from '../../common/message/MessageName';
import WrapperExecutor from '../../core/domain/WrapperExecutor';
import Executor from '../../core/infrastructure/Executor';
import DomainEvent from '../domain/DomainEvent';
import EventBus from '../domain/EventBus';
import EventSubscriber from '../domain/EventSubscriber';

export default class InMemoryEventBus implements EventBus {
    private readonly executor: Executor<DomainEvent, void>;

    constructor(
        private readonly domainEventSubscriberMapper: Mapper<MessageName, Array<EventSubscriber<DomainEvent>>>,
        executors: WrapperExecutor<DomainEvent, void>[] = [],
    ) {
        this.executor = new Executor<DomainEvent, void>(executors);
    }

    async publish(events: DomainEvent[]): Promise<void> {
        for (const event of events) {
            this.domainEventSubscriberMapper.search(event.name)
                .forEach((subscriber) => {
                    this.executor.run(event, async () => {
                        await subscriber.dispatch(event)
                    })
                })
        }
    }

    async start(): Promise<void> {
    }
}

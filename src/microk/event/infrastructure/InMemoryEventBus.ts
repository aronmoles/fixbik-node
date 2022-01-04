import { Mapper } from '../../common/Mapper';
import MessageName from '../../common/message/MessageName';
import WrapperExecutor from '../../core/domain/WrapperExecutor';
import Executor from '../../core/infrastructure/Executor';
import DomainEvent from '../domain/DomainEvent';
import EventBus from '../domain/EventBus';
import EventSubscriber from '../domain/EventSubscriber';
import Inject from '../../core/infrastructure/di/Inject.decorator';
import InjectTag from '../../core/infrastructure/di/InjecTag.decorator';
import { ContainerTag } from '../../core/domain/di/ContainerTag';
import { Keys } from '../../../modules/shared/infrastructure/di/Keys';
import EventStore from '../domain/EventStore';

export default class InMemoryEventBus implements EventBus {
    private readonly executor: Executor<DomainEvent, void>;

    constructor(
        @Inject(Keys.CQRS.EventSubscriberMapper)
        private readonly domainEventSubscriberMapper: Mapper<MessageName, Array<EventSubscriber<DomainEvent>>>,
        @Inject(Keys.CQRS.EventStore) private readonly eventStore: EventStore,
        @InjectTag(ContainerTag.EVENT_EXECUTOR) executors: WrapperExecutor<DomainEvent, void>[] = [],
    ) {
        this.executor = new Executor<DomainEvent, void>(executors);
    }

    async publish(events: DomainEvent[]): Promise<void> {
        for (const event of events) {
            await this.eventStore.save(event);
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

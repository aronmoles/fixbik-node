import { Connection, Message, Exchange, Queue } from 'amqp-ts';
import { Keys } from '../../../../modules/shared/infrastructure/di/Keys';
import MessageName from '../../../common/message/MessageName';
import { ContainerTag } from '../../../core/domain/di/ContainerTag';
import Logger from '../../../core/domain/Logger';
import WrapperExecutor from '../../../core/domain/WrapperExecutor';
import Inject from '../../../core/infrastructure/di/Inject.decorator';
import InjectTag from '../../../core/infrastructure/di/InjecTag.decorator';
import Executor from '../../../core/infrastructure/Executor';
import DomainEvent from '../../domain/DomainEvent';
import EventBus from '../../domain/EventBus';
import EventSubscriber from '../../domain/EventSubscriber';
import RabbitMqConfig from './RabbitMqConfig';
import { EventJsonDeserializer } from '../EventJsonDeserializer';
import { Mapper } from '../../../common/Mapper';

export default class RabbitMqEventBus implements EventBus {
    private readonly executor: Executor<DomainEvent, void>;

    private readonly connection: Connection;
    private readonly exchange: Exchange;
    private readonly queue: Queue;

    constructor(
        @Inject(Keys.CQRS.RabbitMqConfig) config: RabbitMqConfig,
        @Inject(Keys.CQRS.EventSubscriberMapper)
        private readonly domainEventSubscriberMapper: Mapper<MessageName, Array<EventSubscriber<DomainEvent>>>,
        @Inject(Keys.CQRS.EventDeserializer) private readonly deserializer: EventJsonDeserializer,
        @Inject(Keys.App.Logger) private readonly logger: Logger,
        @InjectTag(ContainerTag.EVENT_EXECUTOR) executors: WrapperExecutor<DomainEvent, void>[] = [],
    ) {
        this.executor = new Executor<DomainEvent, void>(executors);

        this.connection = new Connection(`amqp://${config.user}:${config.password}@${config.host}`);
        this.exchange = this.connection.declareExchange(config.exchange, 'fanout', { durable: false });
        this.queue = this.connection.declareQueue(config.queue);
    }

    async start(): Promise<void> {
        if (!this.deserializer) {
            throw new Error('RabbitMqEventBus has not being properly initialized, deserializer is missing');
        }

        await this.connection.completeConfiguration();

        await this.queue.bind(this.exchange);
        await this.queue.stopConsumer();
        await this.queue.activateConsumer(
            async(message) => {
                try {
                    const event = this.deserializer.deserialize(message.content.toString());
                    if (event) {
                        const subscribers = this.domainEventSubscriberMapper.search(event.name);
                        if (subscribers) {
                            const subscribersNames = subscribers.map((subscriber) => subscriber.constructor.name);
                            this.logger.info(`[RabbitMqEventBus] Message processed: ${event.name.toString()} by ${subscribersNames.join(', ')}`);
                            const subscribersExecutions = subscribers.map((subscriber) => {
                                return this.executor.run(event, async () => subscriber.dispatch(event))
                            });
                            await Promise.all(subscribersExecutions);
                        }
                    }
                    message.ack();
                } catch (error) {
                    message.nack()
                }
            },
            { noAck: false }
        );
    }

    async publish(events: Array<DomainEvent>): Promise<void> {
        events.forEach((event) => {
            const eventPrimitive = event.toPrimitive();
            const message = new Message({
                data: {
                    ...eventPrimitive,
                    meta: undefined,
                },
                meta: eventPrimitive.meta,
            });
            this.logger.info(`[RabbitMqEventBus] Event to be published: ${event.name.toString()}`);
            this.exchange.send(message);
        });
    }
}

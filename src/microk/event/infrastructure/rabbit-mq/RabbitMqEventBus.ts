import { Connection, Message, Exchange, Queue } from 'amqp-ts';
import MessageName from '../../../common/message/MessageName';
import Logger from '../../../core/domain/Logger';
import DomainEvent from '../../domain/DomainEvent';
import EventBus from '../../domain/EventBus';
import EventSubscriber from '../../domain/EventSubscriber';
import RabbitMqConfig from './RabbitMqConfig';
import { EventJsonDeserializer } from '../EventJsonDeserializer';
import { Mapper } from '../../../common/Mapper';

export default class RabbitMqEventbus implements EventBus {
    private readonly connection: Connection;
    private readonly exchange: Exchange;
    private readonly queue: Queue;
    private readonly logger: Logger;
    private deserializer?: EventJsonDeserializer;
    private domainEventSubscriberMapper: Mapper<MessageName, Array<EventSubscriber<DomainEvent>>>;

    constructor(config: RabbitMqConfig, logger: Logger) {
        this.logger = logger;
        this.connection = new Connection(`amqp://${config.user}:${config.password}@${config.host}`);
        this.exchange = this.connection.declareExchange(config.exchange, 'fanout', { durable: false });
        this.queue = this.connection.declareQueue(config.queue);
    }

    async start(domainJsonDeserializer: EventJsonDeserializer): Promise<void> {
        this.deserializer = domainJsonDeserializer;
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
                            const subscribersExecutions = subscribers.map((subscriber) => subscriber.dispatch(event));
                            await Promise.all(subscribersExecutions);
                        }
                    }
                    message.ack();
                } catch (error) {
                    message.reject()
                }
            },
            { noAck: false }
        );
    }

    attachMapper(domainEventSubscriberMapper: Mapper<MessageName, Array<EventSubscriber<DomainEvent>>>): void {
        this.domainEventSubscriberMapper = domainEventSubscriberMapper;
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

import { Connection, Message, Exchange, Queue } from 'amqp-ts';
import Logger from '../../../domain/Logger';
import RabbitMqConfig from './RabbitMqConfig';
import EventBus from '../../../domain/event-bus/EventBus';
import { DomainEventJsonDeserializer } from '../DomainEventJsonDeserializer';
import { Mapper } from '../../../domain/Mapper';
import MessageName from '../../../domain/messages/MessageName';
import DomainEventSubscriber from '../../../domain/event-bus/DomainEventSubscriber';
import DomainEvent from '../../../domain/messages/DomainEvent';

export default class RabbitMqEventbus implements EventBus {
    private readonly connection: Connection;
    private readonly exchange: Exchange;
    private readonly queue: Queue;
    private readonly logger: Logger;
    private deserializer?: DomainEventJsonDeserializer;
    private domainEventSubscriberMapper: Mapper<MessageName, Array<DomainEventSubscriber<DomainEvent>>>;

    constructor(config: RabbitMqConfig, logger: Logger) {
        this.logger = logger;
        this.connection = new Connection(`amqp://${config.user}:${config.password}@${config.host}`);
        this.exchange = this.connection.declareExchange(config.exchange, 'fanout', { durable: false });
        this.queue = this.connection.declareQueue(config.queue);
    }

    async start(domainJsonDeserializer: DomainEventJsonDeserializer): Promise<void> {
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

    attachMapper(domainEventSubscriberMapper: Mapper<MessageName, Array<DomainEventSubscriber<DomainEvent>>>): void {
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

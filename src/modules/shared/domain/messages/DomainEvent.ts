import AggregateMessage from './AggregateMessage';
import Uuid from '../value-object/Uuid';
import MessageMeta from './MessageMeta';
import { MessageType } from './MessageType';
import MessageName from './MessageName';
import AggregateMessageOccurredOn from './AggregateMessageOccurredOn';
import MessageId from './MessageId';

export default class DomainEvent extends AggregateMessage {
    constructor(
        id: MessageId,
        name: MessageName,
        aggregateId: Uuid,
        occurredOn: AggregateMessageOccurredOn,
        meta: MessageMeta = new MessageMeta(),
    ) {
        super(id, MessageType.DOMAIN_EVENT, name, aggregateId, occurredOn, meta);
    }
}

export type DomainEventClass = { EVENT_NAME: MessageName, fromPrimitives(...args: any[]): DomainEvent; };

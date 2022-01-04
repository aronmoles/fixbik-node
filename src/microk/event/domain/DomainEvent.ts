import AggregateMessage from '../../common/message/AggregateMessage';
import MessageMeta from '../../common/message/MessageMeta';
import { MessageType } from '../../common/message/MessageType';
import MessageName from '../../common/message/MessageName';
import AggregateMessageOccurredOn from '../../common/message/AggregateMessageOccurredOn';
import MessageId from '../../common/message/MessageId';
import Uuid from '../../common/value-object/Uuid';

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

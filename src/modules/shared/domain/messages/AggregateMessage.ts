import Message from './Message';
import MessageMeta from './MessageMeta';
import { MessageType } from './MessageType';
import MessageName from './MessageName';
import MessageId from './MessageId';
import Uuid from '../value-object/Uuid';
import AggregateMessageOccurredOn from './AggregateMessageOccurredOn';

export default abstract class AggregateMessage extends Message {
    protected constructor(
        id: MessageId,
        type: MessageType,
        name: MessageName,
        private readonly aggregateId: Uuid,
        private readonly occurredOn: AggregateMessageOccurredOn,
        meta: MessageMeta = new MessageMeta()
    ) {
        super(id, type, name, meta);
    }
}

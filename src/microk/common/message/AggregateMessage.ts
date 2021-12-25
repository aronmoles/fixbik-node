import { PrimitivesObject } from '../PrimitiveType';
import Uuid from '../value-object/Uuid';
import Message from './Message';
import MessageMeta from './MessageMeta';
import { MessageType } from './MessageType';
import MessageName from './MessageName';
import MessageId from './MessageId';
import AggregateMessageOccurredOn from './AggregateMessageOccurredOn';

export default abstract class AggregateMessage extends Message {
    protected constructor(
        id: MessageId,
        type: MessageType,
        name: MessageName,
        protected readonly aggregateId: Uuid,
        protected readonly occurredOn: AggregateMessageOccurredOn,
        meta: MessageMeta = new MessageMeta()
    ) {
        super(id, type, name, meta);
    }

    toPrimitive(): PrimitivesObject {
        return {
            ...super.toPrimitive(),
            aggregateId: this.aggregateId.value(),
            occurredOn: this.occurredOn.toString(),
        };
    }
}

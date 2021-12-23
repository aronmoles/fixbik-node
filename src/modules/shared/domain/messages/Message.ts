import { MessageType } from './MessageType';
import MessageId from './MessageId';
import MessageName from './MessageName';
import MessageMeta from './MessageMeta';

export default abstract class Message {
    protected constructor(
        private readonly id: MessageId,
        private readonly type: MessageType,
        private readonly name: MessageName,
        private readonly meta: MessageMeta,
    ) {}
}

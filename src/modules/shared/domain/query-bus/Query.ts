import SimpleMessage from '../messages/SimpleMessage';
import MessageId from '../messages/MessageId';
import MessageName from '../messages/MessageName';
import MessageMeta from '../messages/MessageMeta';
import { MessageType } from '../messages/MessageType';

export default class Query extends SimpleMessage {
    constructor(id: MessageId, name: MessageName, meta?: MessageMeta) {
        super(id, MessageType.QUERY, name, meta);
    }
}

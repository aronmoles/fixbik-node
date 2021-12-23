import SimpleMessage from '../messages/SimpleMessage';
import { MessageType } from '../messages/MessageType';
import MessageMeta from '../messages/MessageMeta';
import MessageName from '../messages/MessageName';
import MessageId from '../messages/MessageId';

export default class Command extends SimpleMessage {
    constructor(id: MessageId, name: MessageName, meta?: MessageMeta) {
        super(id, MessageType.COMMAND, name, meta);
    }
}

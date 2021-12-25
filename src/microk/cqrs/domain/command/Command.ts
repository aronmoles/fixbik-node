import SimpleMessage from '../../../common/message/SimpleMessage';
import { MessageType } from '../../../common/message/MessageType';
import MessageMeta from '../../../common/message/MessageMeta';
import MessageName from '../../../common/message/MessageName';
import MessageId from '../../../common/message/MessageId';

export default class Command extends SimpleMessage {
    constructor(id: MessageId, name: MessageName, meta?: MessageMeta) {
        super(id, MessageType.COMMAND, name, meta);
    }
}

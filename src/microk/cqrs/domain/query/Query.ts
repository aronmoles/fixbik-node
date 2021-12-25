import SimpleMessage from '../../../common/message/SimpleMessage';
import MessageMeta from '../../../common/message/MessageMeta';
import MessageName from '../../../common/message/MessageName';
import { MessageType } from '../../../common/message/MessageType';
import MessageId from '../../../common/message/MessageId';

export default class Query extends SimpleMessage {
    constructor(id: MessageId, name: MessageName, meta?: MessageMeta) {
        super(id, MessageType.QUERY, name, meta);
    }
}

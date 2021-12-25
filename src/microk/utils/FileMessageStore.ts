import MessageStore from '../message-store/domain/MessageStore';
import * as fs from 'fs';
import Message from '../common/message/Message';

export default class FileMessageStore implements MessageStore {
    async store(message: Message): Promise<void> {
        fs.appendFileSync(
            'message-store.log',
            JSON.stringify(message.toPrimitive(), null, 2),
        )
    }
}

import Message from '../../common/message/Message';

export default interface MessageStore {
    store(message: Message): Promise<void>;
}

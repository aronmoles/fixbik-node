import Message from '../../common/message/Message';
import WrapperExecutor from '../../core/domain/WrapperExecutor';
import MessageStore from '../domain/MessageStore';

export default class StoreMessageBusMiddleware implements WrapperExecutor<Message, any> {
    constructor(private readonly messageStore: MessageStore) {}

    async run(message: Message, next: () => Promise<any>): Promise<any> {
        const res = await next();
        await this.messageStore.store(message);
        return res;
    }
}

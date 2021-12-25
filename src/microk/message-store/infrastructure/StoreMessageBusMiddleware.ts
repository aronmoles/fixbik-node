import BusMiddleware from '../../core/domain/BusMiddleware';
import MessageStore from '../domain/MessageStore';
import Message from '../../common/message/Message';

export default class StoreMessageBusMiddleware implements BusMiddleware<Message, any> {
    constructor(private readonly messageStore: MessageStore) {}

    async handle(message: Message, next: () => Promise<any>): Promise<any> {
        const res = await next();
        await this.messageStore.store(message);
        return res;
    }
}

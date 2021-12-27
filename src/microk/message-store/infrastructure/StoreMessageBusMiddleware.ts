import Message from '../../common/message/Message';
import BusMiddleware from '../../core/domain/BusMiddleware';
import { BusMiddlewareOrder } from '../../core/domain/BusMiddlewareOrder';
import MessageStore from '../domain/MessageStore';

export default class StoreMessageBusMiddleware implements BusMiddleware<Message, any> {
    constructor(private readonly messageStore: MessageStore) {}

    order(): BusMiddlewareOrder {
        return BusMiddlewareOrder.TRACKER;
    }

    async handle(message: Message, next: () => Promise<any>): Promise<any> {
        const res = await next();
        await this.messageStore.store(message);
        return res;
    }
}

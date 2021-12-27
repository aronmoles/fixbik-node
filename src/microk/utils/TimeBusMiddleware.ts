import MessageMeta from '../common/message/MessageMeta';
import { BusMiddlewareOrder } from '../core/domain/BusMiddlewareOrder';
import Logger from '../core/domain/Logger';
import BusMiddleware from '../core/domain/BusMiddleware';
import Message from '../common/message/Message';

export default class TimeBusMiddleware implements BusMiddleware<Message, any> {
    constructor(private readonly logger: Logger) {}

    order(): BusMiddlewareOrder {
        return BusMiddlewareOrder.COLLECTOR;
    }

    async handle(message: Message, next: () => Promise<any>): Promise<any> {
        const startTimestamp = Date.now();
        const res = await next();
        const endTimestamp = Date.now();
        const time = endTimestamp - startTimestamp;
        message.meta.set(MessageMeta.KEYS.TIME, time);
        this.logger.info(`${message.name.value()} ${endTimestamp - startTimestamp}ms`);
        return res;
    }
}

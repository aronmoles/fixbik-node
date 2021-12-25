import Logger from '../core/domain/Logger';
import BusMiddleware from '../core/domain/BusMiddleware';
import Message from '../common/message/Message';

export default class BusTimeMiddleware implements BusMiddleware<Message, any> {
    constructor(private readonly logger: Logger) {}

    async handle(message: Message, next: () => Promise<any>): Promise<any> {
        const startTimestamp = Date.now();
        const res = await next();
        const endTimestamp = Date.now();
        this.logger.info(`${message.name.value()} ${endTimestamp - startTimestamp}ms`);
        return res;
    }
}

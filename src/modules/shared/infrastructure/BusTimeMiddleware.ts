import Logger from '../domain/Logger';
import BusMiddleware from '../domain/BusMiddleware';
import Message from '../domain/messages/Message';

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

import Logger from '../domain/Logger';
import BusMiddleware from '../domain/BusMiddleware';
import Message from '../domain/messages/Message';

export default class BusTimeMiddleware implements BusMiddleware<Message, unknown> {
    constructor(private readonly logger: Logger) {}

    async handle(message: Message, next: () => Promise<unknown>): Promise<unknown> {
        console.log('BUS TIME MIDDLEWARE', 'START')
        const startTimestamp = Date.now();
        const res = await next();
        const endTimestamp = Date.now();
        console.log('BUS TIME MIDDLEWARE', 'END')
        this.logger.info(`Bus Time: ${endTimestamp - startTimestamp}ms`);
        return res;
    }
}

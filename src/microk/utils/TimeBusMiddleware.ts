import MessageMeta from '../common/message/MessageMeta';
import WrapperExecutor from '../core/domain/WrapperExecutor';
import Logger from '../core/domain/Logger';
import Message from '../common/message/Message';

export default class TimeBusMiddleware implements WrapperExecutor<Message, any> {
    constructor(private readonly logger: Logger) {}

    async run(message: Message, next: () => Promise<any>): Promise<any> {
        const startTimestamp = Date.now();
        const res = await next();
        const endTimestamp = Date.now();

        const time = endTimestamp - startTimestamp;
        message.meta.set(MessageMeta.KEYS.TIME, time);
        this.logger.info(`${message.name.value()} ${endTimestamp - startTimestamp}ms`);

        return res;
    }
}

import { Keys } from '../../modules/shared/infrastructure/di/Keys';
import MessageMeta from '../common/message/MessageMeta';
import WrapperExecutor from '../core/domain/WrapperExecutor';
import Logger from '../core/domain/Logger';
import Message from '../common/message/Message';
import Inject from '../core/infrastructure/di/Inject.decorator';

export default class TimeBusMiddleware implements WrapperExecutor<Message, any> {
    constructor(
        @Inject(Keys.App.Logger) private readonly logger: Logger,
    ) {}

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

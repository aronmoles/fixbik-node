import { Keys } from '../../../modules/shared/infrastructure/di/Keys';
import Message from '../../common/message/Message';
import WrapperExecutor from '../../core/domain/WrapperExecutor';
import Inject from '../../core/infrastructure/di/Inject.decorator';
import MessageStore from '../domain/MessageStore';

export default class StoreMessageBusMiddleware implements WrapperExecutor<Message, any> {
    constructor(
        @Inject(Keys.App.MessageStore) private readonly messageStore: MessageStore,
    ) {
    }

    async run(message: Message, next: () => Promise<any>): Promise<any> {
        const res = await next();
        await this.messageStore.store(message);
        return res;
    }
}

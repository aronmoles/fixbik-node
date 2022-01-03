import Logger from '@microk/core/domain/Logger';
import Inject from '@microk/core/infrastructure/di/Inject.decorator';
import { sleep } from '@microk/utils/Sleep';
import { Keys } from '../../../shared/infrastructure/di/Keys';

export default class SendEmailService {
    constructor(
        @Inject(Keys.App.Logger) private readonly logger: Logger,
    ) {
    }

    async invoke(): Promise<void> {
        await sleep(2000)
        this.logger.info('SEND EMAIL')
    }
}

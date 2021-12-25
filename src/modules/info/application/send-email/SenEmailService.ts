import Logger from '@microk/core/domain/Logger';
import { sleep } from '@microk/utils/Sleep';

export default class SendEmailService {
    constructor(private readonly logger: Logger) {
    }

    async invoke(): Promise<void> {
        await sleep(2000)
        this.logger.info('SEND EMAIL')
    }
}

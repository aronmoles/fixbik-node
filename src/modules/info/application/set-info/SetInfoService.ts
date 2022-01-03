import Logger from '@microk/core/domain/Logger';
import Inject from '@microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';

export default class SetInfoService {
    constructor(
        @Inject(Keys.App.Logger) private readonly logger: Logger,
    ) {
    }

    public async invoke(): Promise<void> {
        this.logger.info('SET INFO!')
    }
}

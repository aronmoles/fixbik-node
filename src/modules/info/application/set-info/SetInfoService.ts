import { Keys } from '../../../shared/infrastructure/di/Keys';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import Logger from '../../../../microk/core/domain/Logger';

export default class SetInfoService {
    constructor(
        @Inject(Keys.App.Logger) private readonly logger: Logger,
    ) {
    }

    public async invoke(): Promise<void> {
        this.logger.info('SET INFO!')
    }
}

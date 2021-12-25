import Logger from '@microk/core/domain/Logger';

export default class SetInfoService {
    constructor(private readonly logger: Logger) {
    }

    public async invoke(): Promise<void> {
        this.logger.info('SET INFO!')
    }
}

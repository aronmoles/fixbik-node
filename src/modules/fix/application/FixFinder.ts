import FixRepository from '../domain/FixRepository';
import FixId from '../domain/FixId';
import NotFoundHttpError from '../../../microk/common/http/errors/NotFoundHttpError';
import Fix from '../domain/Fix';

export default class FixFinder {
    constructor(
        private readonly fixRepository: FixRepository,
    ) {
    }

    async find(id: FixId): Promise<Fix> {
        const fix = await this.fixRepository.search(id);

        if (!fix) {
            throw new NotFoundHttpError('Fix not found')
        }

        return fix;
    }
}

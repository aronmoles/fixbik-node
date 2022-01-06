import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import BikeRepository from '../../domain/BikeRepository';
import Bike from '../../domain/Bike';
import BikeId from '../../domain/BikeId';
import NotFoundHttpError from '../../../../microk/common/http/errors/NotFoundHttpError';
import AuthUserId from '../../../auth/domain/AuthUserId';
import ForbiddenHttpError from '../../../../microk/common/http/errors/ForbiddenHttpError';

export default class BikeDetail {
    constructor(
        @Inject(Keys.Bike.BikeRepository) private readonly bikeRepository: BikeRepository,
    ) {
    }

    async run(bikeId: string, authUserId: string): Promise<Bike> {
        const bike = await this.bikeRepository.search(BikeId.fromString(bikeId))
        if (!bike) {
            throw new NotFoundHttpError('Bike not exists')
        }

        if (!bike.belongs(AuthUserId.fromString(authUserId))) {
            throw new ForbiddenHttpError('Do not have permissions to show this bike')
        }

        return bike;
    }
}

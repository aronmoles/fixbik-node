import BikeRepository from '../domain/BikeRepository';
import BikeId from '../domain/BikeId';
import Bike from '../domain/Bike';
import NotFoundHttpError from '../../../microk/common/http/errors/NotFoundHttpError';

export default class BikeFinder {
    constructor(
        private readonly bikeRepository: BikeRepository,
    ) {
    }

    async find(id: BikeId): Promise<Bike> {
        const bike = await this.bikeRepository.search(id);
        if (!bike) {
            throw new NotFoundHttpError('Bike not exists')
        }
        return bike;
    }
}

import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import BikeRepository from '../../domain/BikeRepository';
import Bike from '../../domain/Bike';
import BikeId from '../../domain/BikeId';
import AuthUserId from '../../../auth/domain/AuthUserId';
import BikeFinder from '../BikeFinder';

export default class BikeDetail {
    private readonly bikeFinder: BikeFinder;

    constructor(
        @Inject(Keys.Bike.BikeRepository) private readonly bikeRepository: BikeRepository,
    ) {
        this.bikeFinder = new BikeFinder(this.bikeRepository);
    }

    async run(bikeId: string, authUserId: string): Promise<Bike> {
        const bike = await this.bikeFinder.find(BikeId.fromString(bikeId))

        bike.checkBelongs(AuthUserId.fromString(authUserId));

        return bike;
    }
}

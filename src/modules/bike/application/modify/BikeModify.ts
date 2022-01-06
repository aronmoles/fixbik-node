import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import BikeRepository from '../../domain/BikeRepository';
import BikeId from '../../domain/BikeId';
import EventBus from '../../../../microk/event/domain/EventBus';
import BikeName from '../../domain/BikeName';
import BikeBrand from '../../domain/BikeBrand';
import BikeModel from '../../domain/BikeModel';
import BikeYear from '../../domain/BikeYear';
import AuthUserId from '../../../auth/domain/AuthUserId';
import BikeFinder from '../BikeFinder';

export default class BikeModify {
    private readonly bikeFinder: BikeFinder;

    constructor(
        @Inject(Keys.Bike.BikeRepository) private readonly bikeRepository: BikeRepository,
        @Inject(Keys.CQRS.EventBus) private readonly eventBus: EventBus,
    ) {
        this.bikeFinder = new BikeFinder(this.bikeRepository);
    }

    async run(id: string, name: string, brand: string, model: string, year: number, authUserId: string): Promise<void> {
        const bikeId = BikeId.fromString(id);
        const bike = await this.bikeFinder.find(bikeId)

        bike.checkBelongs(AuthUserId.fromString(authUserId));

        bike.updateValues(
            new BikeName(name),
            new BikeBrand(brand),
            new BikeModel(model),
            new BikeYear(year),
        )
        await this.bikeRepository.save(bike);

        this.eventBus.publish(bike.pullDomainEvents())
    }
}

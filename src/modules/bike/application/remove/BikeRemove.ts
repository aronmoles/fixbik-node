import BikeRepository from '../../domain/BikeRepository';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import EventBus from '../../../../microk/event/domain/EventBus';
import BikeFinder from '../BikeFinder';
import BikeId from '../../domain/BikeId';
import AuthUserId from '../../../auth/domain/AuthUserId';
import BikeRemovedDomainEvent from '../../domain/BikeRemovedDomainEvent';

export default class BikeRemove {
    private readonly bikeFinder: BikeFinder;
    constructor(
        @Inject(Keys.Bike.BikeRepository) private readonly bikeRepository: BikeRepository,
        @Inject(Keys.CQRS.EventBus) private readonly eventBus: EventBus,
    ) {
        this.bikeFinder = new BikeFinder(this.bikeRepository)
    }

    async run(id: string, authUserId: string): Promise<void> {
        const bikeId = BikeId.fromString(id);
        const bike = await this.bikeFinder.find(bikeId);

        bike.checkBelongs(AuthUserId.fromString(authUserId))

        await this.bikeRepository.delete(bikeId);

        this.eventBus.publish([new BikeRemovedDomainEvent(bike)])
    }
}

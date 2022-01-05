import EventBus from '../../../../microk/event/domain/EventBus';
import BikeRepository from '../../domain/BikeRepository';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import BikeId from '../../domain/BikeId';
import AlreadyExistsHttpError from '../../../../microk/common/http/errors/AlreadyExistsHttpError';
import BikeName from '../../domain/BikeName';
import BikeBrand from '../../domain/BikeBrand';
import BikeModel from '../../domain/BikeModel';
import BikeYear from '../../domain/BikeYear';
import Bike from '../../domain/Bike';
import AuthUserId from '../../../auth/domain/AuthUserId';

export default class BikeCreator {
    constructor(
        @Inject(Keys.Bike.BikeRepository) private readonly bikeRepository: BikeRepository,
        @Inject(Keys.CQRS.EventBus) private readonly eventBus: EventBus,
    ) {
    }

    async run(id: string, userId: string, name: string, brand: string, model: string, year: number): Promise<void> {
        const bikeId = BikeId.fromString(id)

        const bikeCheck = await this.bikeRepository.search(bikeId);
        if (bikeCheck) {
            throw new AlreadyExistsHttpError('Bike already exists')
        }

        const bike = Bike.create(
            bikeId,
            AuthUserId.fromString(userId),
            new BikeName(name),
            new BikeBrand(brand),
            new BikeModel(model),
            new BikeYear(year),
        )

        await this.bikeRepository.save(bike);

        this.eventBus.publish(bike.pullDomainEvents());
    }
}

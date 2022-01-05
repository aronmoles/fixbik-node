import BikeRepository from '../../domain/BikeRepository';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import Bike from '../../domain/Bike';
import AuthUserId from '../../../auth/domain/AuthUserId';

export default class BikeList {
    constructor(
        @Inject(Keys.Bike.BikeRepository) private readonly bikeRepository: BikeRepository,
    ) {
    }

    async run(userId: string): Promise<Bike[]> {
        const authUserId = AuthUserId.fromString(userId)
        return this.bikeRepository.searchUser(authUserId);
    }
}

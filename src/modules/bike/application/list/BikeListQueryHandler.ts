import { QueryHandler } from '../../../../microk/cqrs/domain/query/QueryHandler';
import BikeListQuery from './BikeListQuery';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';
import BikeList from './BikeList';
import BikeDto from '../../infrastructure/dto/BikeDto';

export default class BikeListQueryHandler extends QueryHandler<BikeListQuery, BikeDto[]> {
    constructor(
        @Inject(Keys.Bike.BikeList) private readonly bikeList: BikeList,
    ) {
        super(BikeListQuery);
    }

    async handle(query: BikeListQuery): Promise<BikeDto[]> {
        const bikes = await this.bikeList.run(query.authUserId);
        return bikes.map(BikeDto.fromBike)
    }
}

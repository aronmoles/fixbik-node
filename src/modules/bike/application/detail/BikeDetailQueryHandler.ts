import { QueryHandler } from '../../../../microk/cqrs/domain/query/QueryHandler';
import BikeDetailQuery from './BikeDetailQuery';
import BikeDto from '../../infrastructure/dto/BikeDto';
import BikeDetail from './BikeDetail';
import Inject from '../../../../microk/core/infrastructure/di/Inject.decorator';
import { Keys } from '../../../shared/infrastructure/di/Keys';

export default class BikeDetailQueryHandler extends QueryHandler<BikeDetailQuery, BikeDto> {
    constructor(
        @Inject(Keys.Bike.BikeDetail) private readonly bikeDetail: BikeDetail,
    ) {
        super(BikeDetailQuery);
    }

    async handle(query: BikeDetailQuery): Promise<BikeDto> {
        const bike = await this.bikeDetail.run(query.bikeId, query.authUserId);
        return BikeDto.fromBike(bike);
    }
}

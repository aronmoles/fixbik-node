import BikeMother from '../../domain/BikeMother';
import BikeRepositoryMock from '../../__mocks__/BikeRepositoryMock';
import BikeListQueryMother from './BikeListQueryMother';
import BikeListQueryHandler from '../../../../../src/modules/bike/application/list/BikeListQueryHandler';
import BikeList from '../../../../../src/modules/bike/application/list/BikeList';
import BikeDto from '../../../../../src/modules/bike/infrastructure/dto/BikeDto';

let bikeRepository: BikeRepositoryMock;
let bikeListQueryHandler: BikeListQueryHandler;

beforeEach(() => {
    bikeRepository = new BikeRepositoryMock();
    bikeListQueryHandler = new BikeListQueryHandler(
        new BikeList(bikeRepository),
    );
});

describe('BikeList', () => {
    it('should list a bikes of user', async () => {
        const query = BikeListQueryMother.random();
        const bike = BikeMother.fromBikeListQuery(query);
        bikeRepository.mockReturn(bike);

        const bikeList = await bikeListQueryHandler.handle(query);

        expect(bikeList).toEqual([BikeDto.fromBike(bike)])
    });
});

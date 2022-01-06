import BikeMother from '../../domain/BikeMother';
import BikeRepositoryMock from '../../__mocks__/BikeRepositoryMock';
import BikeDto from '../../../../../src/modules/bike/infrastructure/dto/BikeDto';
import BikeDetailQueryHandler from '../../../../../src/modules/bike/application/detail/BikeDetailQueryHandler';
import BikeDetail from '../../../../../src/modules/bike/application/detail/BikeDetail';
import BikeDetailQueryMother from './BikeDetailQueryMother';
import UnauthorizedHttpError from '../../../../../src/microk/common/http/errors/UnauthorizedHttpError';
import NotFoundHttpError from '../../../../../src/microk/common/http/errors/NotFoundHttpError';
import ForbiddenHttpError from '../../../../../src/microk/common/http/errors/ForbiddenHttpError';

let bikeRepository: BikeRepositoryMock;
let bikeDetailQueryHandler: BikeDetailQueryHandler;

beforeEach(() => {
    bikeRepository = new BikeRepositoryMock();
    bikeDetailQueryHandler = new BikeDetailQueryHandler(
        new BikeDetail(bikeRepository),
    );
});

describe('BikeDetail', () => {
    it('should get a bike', async () => {
        const query = BikeDetailQueryMother.random();
        const bike = BikeMother.fromBikeDetailQuery(query);
        bikeRepository.mockReturn(bike);

        const bikeResponse = await bikeDetailQueryHandler.handle(query);

        expect(bikeResponse)
            .toEqual(BikeDto.fromBike(bike))
    });

    it('should throw NotFoundHttpError if bike not exists', async () => {
        const query = BikeDetailQueryMother.random();
        bikeRepository.mockReturn(null);

        await expect(async () => {
            await bikeDetailQueryHandler.handle(query);
        }).rejects.toThrow(NotFoundHttpError);
    });

    it('should throw ForbiddenHttpError if bike not belongs to user', async () => {
        const query = BikeDetailQueryMother.random();
        const bike = BikeMother.random();
        bikeRepository.mockReturn(bike);

        await expect(async () => {
            await bikeDetailQueryHandler.handle(query);
        }).rejects.toThrow(ForbiddenHttpError);
    });
});

import BikeMother from '../../domain/BikeMother';
import EventBusMock from '../../../shared/__mocks__/EventBusMock';
import BikeRepositoryMock from '../../__mocks__/BikeRepositoryMock';
import NotFoundHttpError from '../../../../../src/microk/common/http/errors/NotFoundHttpError';
import ForbiddenHttpError from '../../../../../src/microk/common/http/errors/ForbiddenHttpError';
import BikeRemoveCommandHandler from '../../../../../src/modules/bike/application/remove/BikeRemoveCommandHandler';
import BikeRemove from '../../../../../src/modules/bike/application/remove/BikeRemove';
import BikeRemoveCommandMother from './BikeRemoveCommandMother';

let bikeRepository: BikeRepositoryMock;
let eventBus: EventBusMock;
let bikeRemoveCommandHandler: BikeRemoveCommandHandler;

beforeEach(() => {
    bikeRepository = new BikeRepositoryMock();
    eventBus = new EventBusMock();
    bikeRemoveCommandHandler = new BikeRemoveCommandHandler(
        new BikeRemove(bikeRepository, eventBus),
    );
});

describe('BikeRemove', () => {
    it('should remove a bike', async () => {
        const command = BikeRemoveCommandMother.random();
        const bike = BikeMother.fromBikeRemoveCommand(command);
        bikeRepository.mockReturn(bike);

        await bikeRemoveCommandHandler.handle(command);

        bikeRepository.hasBenCalledDeleteWith(bike.id);
        eventBus.hasBeenPublishedEvent();
    });

    it('should throw NotFoundHttpError if bike not exists', async () => {
        const command = BikeRemoveCommandMother.random();
        bikeRepository.mockReturn(null);

        await expect(async () => {
            await bikeRemoveCommandHandler.handle(command);
        })
            .rejects
            .toThrow(NotFoundHttpError);
    });

    it('should throw ForbiddenHttpError if bike not belongs to user', async () => {
        const command = BikeRemoveCommandMother.random();
        const bike = BikeMother.random();
        bikeRepository.mockReturn(bike);

        await expect(async () => {
            await bikeRemoveCommandHandler.handle(command);
        })
            .rejects
            .toThrow(ForbiddenHttpError);
    });
});

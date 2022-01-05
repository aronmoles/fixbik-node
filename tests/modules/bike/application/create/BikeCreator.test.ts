import BikeCreatorCommandMother from './BikeCreatorCommandMother';
import BikeMother from '../../domain/BikeMother';
import EventBusMock from '../../../shared/__mocks__/EventBusMock';
import BikeCreatorCommandHandler from '../../../../../src/modules/bike/application/create/BikeCreatorCommandHandler';
import BikeCreator from '../../../../../src/modules/bike/application/create/BikeCreator';
import BikeRepositoryMock from '../../__mocks__/BikeRepositoryMock';
import AlreadyExistsHttpError from '../../../../../src/microk/common/http/errors/AlreadyExistsHttpError';

let bikeRepository: BikeRepositoryMock;
let eventBus: EventBusMock;
let bikeCreatorCommandHandler: BikeCreatorCommandHandler;

beforeEach(() => {
    bikeRepository = new BikeRepositoryMock();
    eventBus = new EventBusMock();
    bikeCreatorCommandHandler = new BikeCreatorCommandHandler(
        new BikeCreator(bikeRepository, eventBus),
    );
});

describe('BikeCreate', () => {
    it('should create a bike', async () => {
        const command = BikeCreatorCommandMother.random();
        const bike = BikeMother.fromQuery(command);

        await bikeCreatorCommandHandler.handle(command);

        bikeRepository.hasBenCalledSaveWith(bike);
        eventBus.hasBeenPublishedEvent();
    });

    it('should throw NotFoundError if user not exists', async () => {
        const command = BikeCreatorCommandMother.random();
        bikeRepository.mockReturn(BikeMother.random())

        await expect(async () => {
            await bikeCreatorCommandHandler.handle(command);
        }).rejects.toThrow(AlreadyExistsHttpError);
    });
});

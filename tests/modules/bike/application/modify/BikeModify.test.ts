import BikeMother from '../../domain/BikeMother';
import EventBusMock from '../../../shared/__mocks__/EventBusMock';
import BikeRepositoryMock from '../../__mocks__/BikeRepositoryMock';
import BikeModifyCommandMother from './BikeModifyCommandMother';
import BikeModifyCommandHandler from '../../../../../src/modules/bike/application/modify/BikeModifyCommandHandler';
import BikeModify from '../../../../../src/modules/bike/application/modify/BikeModify';
import NotFoundHttpError from '../../../../../src/microk/common/http/errors/NotFoundHttpError';
import ForbiddenHttpError from '../../../../../src/microk/common/http/errors/ForbiddenHttpError';

let bikeRepository: BikeRepositoryMock;
let eventBus: EventBusMock;
let bikeModifyCommandHandler: BikeModifyCommandHandler;

beforeEach(() => {
    bikeRepository = new BikeRepositoryMock();
    eventBus = new EventBusMock();
    bikeModifyCommandHandler = new BikeModifyCommandHandler(
        new BikeModify(bikeRepository, eventBus),
    );
});

describe('BikeModify', () => {
    it('should modify a bike', async () => {
        const command = BikeModifyCommandMother.random();
        const bike = BikeMother.fromBikeModifyCommand(command);
        bikeRepository.mockReturn(bike);

        await bikeModifyCommandHandler.handle(command);

        bikeRepository.hasBenCalledSaveWith(bike);
        eventBus.hasBeenPublishedEvent();
    });

    it('should throw NotFoundHttpError if bike not exists', async () => {
        const command = BikeModifyCommandMother.random();
        bikeRepository.mockReturn(null);

        await expect(async () => {
            await bikeModifyCommandHandler.handle(command);
        })
            .rejects
            .toThrow(NotFoundHttpError);
    });

    it('should throw ForbiddenHttpError if bike not belongs to user', async () => {
        const command = BikeModifyCommandMother.random();
        const bike = BikeMother.random();
        bikeRepository.mockReturn(bike);

        await expect(async () => {
            await bikeModifyCommandHandler.handle(command);
        })
            .rejects
            .toThrow(ForbiddenHttpError);
    });
});
